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
  "setupGroups" : [ "EventTriggeringTest" ],
  "name" : "ApproveActionTest",
  "description" : null,
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

function handleNamePartObject(nodeBefore, nodeAfter) {
	var isNew = !nodeBefore
	return {
		type:'Name',
		nameBefore: isNew?'':nvl(nodeBefore.getName()),
		nameAfter : nvl(nodeAfter.getName())
	}
}
function handleValuePartObject(po, nodeBefore, nodeAfter) {
	return {
		type:'Value',
		aid:po.getAttributeID(),
		valBefore : nvl(getValue(nodeBefore, po.getAttributeID())),
		valAfter : nvl(getValue(nodeAfter, po.getAttributeID()))
	}
}
function handleReferencePartObject(po, nodeBefore, nodeAfter) {
	var a = hasRef(nodeAfter, po.getReferenceType(), po.getTargetID());
	var b = hasRef(nodeBefore, po.getReferenceType(), po.getTargetID())
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
	var bRef = getReference(nodeBefore, refType.getID(), po.getTargetID())
	var aRef = getReference(nodeAfter, refType.getID(), po.getTargetID())
	refType.getValidDescriptionAttributes().toArray().forEach(function(attr) {
		var bVal = getValue(bRef, attr.getID());
		var aVal = getValue(aRef, attr.getID());
		if (aVal != bVal) {
			doc.values.push({
				aid : attr.getID(),
				valBefore : bVal,
				valAfter : aVal
			})
		}
	})
	return doc;
}

//############################## MAIN ##############################
var data = {
	type: node,
	id: node.getID(),
	ctx: manager.getCurrentContext().getID(),
	user: manager.getCurrentUser().getID(),
	time: new Date(Date.now()).toISOString(),
	changes: []
}

ac.getPartObjects().forEach(function (po) {
	if (po instanceof com.stibo.core.domain.partobject.NamePartObject) {
		data.changes.push(handleNamePartObject(ac.getApprovedNode(), ac.getMainNode()))
	}
	else if (po instanceof com.stibo.core.domain.partobject.ValuePartObject) {
		data.changes.push(handleValuePartObject(po, ac.getApprovedNode(), ac.getMainNode()))
	}
	else if (po instanceof com.stibo.core.domain.partobject.ReferencePartObject) {
		data.changes.push(handleReferencePartObject(po, ac.getApprovedNode(), ac.getMainNode()))
	}
     else {
		logger.info('Unhandled ' + po)
	}
})

logger.info(JSON.stringify(data))
}