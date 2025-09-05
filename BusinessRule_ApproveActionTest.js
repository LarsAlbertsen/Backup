/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ApproveActionTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "ApproveActions" ],
  "name" : "ApproveActionTest",
  "description" : "Generates JSON snippet of approved changes",
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Trigger",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ApproveContextBindContract",
    "alias" : "ac",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,ac,manager) {
function nvl(v) {
	return v?v:''
}
function getReference(n, refTypeid, tid) {
	var foundRef = null
	n.queryReferences(n.getManager().getReferenceTypeHome().getReferenceTypeByID(refTypeid)).forEach(function(ref) {
		if (n.equals(ref.getSource()) && tid == ref.getTarget().getID()) {
			foundRef = ref; 
		}
		return !foundRef
	})
	return foundRef
}
function hasRef(n, refTypeid, tid) {
	return getReference(n, refTypeid, tid)? true : false
}

function getValue(n,aid) {
	if (n) {
		var v = n.getValue(aid);
		if (v) {
			if (v.getSimpleValue()) {
				return v.getSimpleValue()
			}
		}	
	}
	return ''
}

function handleNamePartObject(po, nodeBefore, nodeAfter) {
	var isNew = !nodeBefore
	return {
		type:'Name',
		nameBefore: isNew?'':nvl(nodeBefore.getName()),
		nameAfter : nvl(nodeAfter.getName())
		,userid : nodeAfter.getEditRevision(po).getUserID() //getEditRevision accesses data not in-memory, and makes the BR run 6 times slower
		,time : new Date(nodeAfter.getEditRevision(po).getEditedDate()).toISOString()
	}
}
function handleValuePartObject(po, nodeBefore, nodeAfter) {
	return {
		type:'Value',
		aid:po.getAttributeID(),
		valBefore : nvl(getValue(nodeBefore, po.getAttributeID())),
		valAfter : nvl(getValue(nodeAfter, po.getAttributeID()))
		,userid : nodeAfter.getEditRevision(po).getUserID()
		,time : new Date(nodeAfter.getEditRevision(po).getEditedDate()).toISOString()
	}
}
function handleReferencePartObject(po, nodeBefore, nodeAfter) {
	//NOTE, po is passed even if the target does not exist in Approved WS. 
	//I.e., even the attempt to approve a reference, even though the target does not exist in Approved WS, results in a Part Object. 
	//The approval will actually fail, so we may have to check if the target exists in Approved WS, and if not, ignore this po
	//TODO: Ignore references to objects not found in Approved WS
	var a = nodeAfter?hasRef(nodeAfter, po.getReferenceType(), po.getTargetID()):false;
	var b = nodeBefore?hasRef(nodeBefore, po.getReferenceType(), po.getTargetID()):false;
	var doc = {
		type : po,
		refType : po.getReferenceType(),
		targetID : po.getTargetID(),
		state : a&&b?'Update':(a&&!b?'New':'Delete'),
		values : []
	}
	if (po instanceof com.stibo.core.domain.partobject.AssetReferencePartObject) {
		doc.type = 'AssetReference'
	} else if (po instanceof com.stibo.core.domain.partobject.ProductReferencePartObject) {
		doc.type = 'ProductReference'
	}
	var refType = manager.getReferenceTypeHome().getReferenceTypeByID(po.getReferenceType());
	var bRef = nodeBefore?getReference(nodeBefore, refType.getID(), po.getTargetID()):'';
	var aRef = nodeAfter?getReference(nodeAfter, refType.getID(), po.getTargetID()):'';
	refType.getValidDescriptionAttributes().toArray().forEach(function(attr) {
		var bVal = bRef?getValue(bRef, attr.getID()):'';
		var aVal = aRef?getValue(aRef, attr.getID()):'';
		if (aVal != bVal) {
			doc.values.push({
				aid : attr.getID(),
				valBefore : bVal,
				valAfter : aVal
				//TODO, user on each value
			})
		}
	})
	return doc;
}
function handleClassificationLinkPartObject(po, nodeBefore, nodeAfter) {
	var doc = {
		type : 'ClassificationLink',
		linkType : po.getLinkTypeID(),
		classID : po.getClassificationID()
		,userid : nodeAfter.getEditRevision(po).getUserID()
		,time : new Date(nodeAfter.getEditRevision(po).getEditedDate()).toISOString()
		//TODO, check if new, update or delete
	}
	return doc;
}

function getBase(n) {
	return n instanceof com.stibo.core.domain.Product ? 'Product' :
			n instanceof com.stibo.core.domain.Classification ? 'Classification' : 
			n instanceof com.stibo.core.domain.Entity ? 'Entity' :
			n instanceof com.stibo.core.domain.Asset ? 'Asset' : node
}

function getNodeState(ac) {
	return ac.getApprovedNode() ? 'Update' : 'New'
}

//############################## MAIN ##############################
//NOTE: Rule is not invoked when approving a deletion (i.e., approve in Recycle Bin
var data = {
	type: getBase(node),
	id: node.getID(),
	ctx: manager.getCurrentContext().getID(),
	user: manager.getCurrentUser().getID(),
	time: new Date(Date.now()).toISOString(),
	state: getNodeState(ac),
	changes: []
}

ac.getPartObjects().forEach(function (po) {
	if (po instanceof com.stibo.core.domain.partobject.NamePartObject) {
		//logger.info(po + ' => NamePartObject')
		data.changes.push(handleNamePartObject(po, ac.getApprovedNode(), ac.getMainNode()))
	}
	else if (po instanceof com.stibo.core.domain.partobject.ValuePartObject) {
		//logger.info(po + ' => ValuePartObject')
		data.changes.push(handleValuePartObject(po, ac.getApprovedNode(), ac.getMainNode()))
	}
	else if (po instanceof com.stibo.core.domain.partobject.ReferencePartObject) {
		//logger.info(po + ' => ReferencePartObject')
		data.changes.push(handleReferencePartObject(po, ac.getApprovedNode(), ac.getMainNode()))
	}
	else if (po instanceof com.stibo.core.domain.partobject.ClassificationLinkPartObject) {
		//logger.info(po + ' => ClassificationLinkPartObject')
		data.changes.push(handleClassificationLinkPartObject(po, ac.getApprovedNode(), ac.getMainNode()))
	}
     else {
		logger.info('Unhandled ' + po)
	}
})

logger.info(JSON.stringify(data))
}