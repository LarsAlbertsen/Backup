/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "createApprovalDocs",
  "type" : "BusinessAction",
  "setupGroups" : [ "Auditing" ],
  "name" : "createApprovalDocs",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
  "onApprove" : "Never",
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
exports.operation0 = function (node,logger,manager) {
var rcHome = manager.getHome(com.stibo.core.domain.unstable.revisionchange.RevisionChangeHome);
const partPrintFilePath = "/shared/upload/server-side-delivery/laal/PartPrint.txt";

function appendPartPrintX(json) {
	const writer = new java.io.BufferedWriter(new java.io.FileWriter(partPrintFilePath, true));
	try {
		writer.write(JSON.stringify(json));
		writer.newLine();
	}
	finally {
		writer.close();
	}
}

function appendPartPrint(json) {
	logger.info(JSON.stringify(json,null,2));
}

function nvl(v) {
	return v ? v : ''
}

function getUserID(node, po) {
	var editRev = node.getEditRevision(po);
	var userId = editRev != null ? editRev.getUserID() : "";
	return userId;
}

function getValue(n, aid, defVal = '') {
	try {
		if (n) {
			var v = n.getValue(aid);
			if (v && !v.isInherited()) {
				if (v.getSimpleValue()) {
					return v.getSimpleValue() ? v.getSimpleValue() : defVal
				}
			}
		}
		return defVal
	} catch (e) {
		return defVal
	}
}


function addBase(json, revision, po) {
	var n = revision.getNode()
	if (n instanceof com.stibo.core.domain.Product) {
		json.type = 'product'
		json.objecttype = n.getObjectType().getID()
	}

	json.id = revision.getNode().getID()
	json.userid = getUserID(revision.getNode(), po)
	json.rev = revision.getName()
	json.time = new Date(revision.getEditedDate()).toISOString()
}


function handleValuePO(revision, po) {
	if ((po.getAttributeID() + '').startsWith('0bits.legacy.')) {
		logger.info(po.getAttributeID())
		return null
	}
	var n = revision.getNode()
	// current context
	var res = {
		changetype: 'Value',
		aid: po.getAttributeID(),
		value: nvl(getValue(n, po.getAttributeID(), ''))
	}

	return res;
}

function handleReferenceValuePO(revision, po, type) {
	if ((po.getAttributeID() + '').startsWith('0bits.legacy.')) {
		logger.info(po.getAttributeID())
		return null
	}
	var n = revision.getNode()
	// current context
	var res = {
		changetype: type,
		referencetype:po.getReferenceType(),
		targetid: po.getTargetID(),
		aid: po.getAttributeID(),
		value: nvl(getValue(n, po.getAttributeID(), ''))
	}
	return res;
}
function handleNamePO(revision, po) {
	var n = revision.getNode();
	var res = {
		changetype: 'Name',
		name: nvl(revision.getNode().getName(), '')
	}
	return res;
}

function handleParentPO(revision, po) {
	var n = revision.getNode();
	var res = {
		changetype: 'Parent',
		parentid: n.getParent().getID()
	}
	return res;
}

function handleReferencePO(revision, po, ct) {
	function hasReference(n,targetid, typ) {
		var qry = n.queryReferences(n.getManager().getReferenceTypeHome().getReferenceTypeByID(typ))
		var found = false;
		qry.forEach(function(ref) {
			found = targetid == ref.getTarget().getID()			
			return !found;
		})
		return found;
	}

	var res = {
		changetype: ct,
		targetid: po.getTargetID(),
		referencetype: po.getReferenceType(),
		isdelete: hasReference(revision.getNode(), po.getTargetID(), po.getReferenceType())
	}
	return res;
}


function handleClassificationLinkPO(revision,po) {
	function hasLink(n,targetid, typ) {
		var qry = n.queryClassificationProductLinks(n.getManager().getLinkTypeHome().getClassificationProductLinkTypeByID(typ))
		var found = false;
		qry.forEach(function(link) {
			found = targetid == link.getClassification().getID()			
			return !found;
		})
		return found;
	}
	var res = {
		changetype: 'ClassificationLink',
		targetid: po.getClassificationID(),
		linktype: po.getLinkTypeID(),
		isdelete: !hasLink(revision.getNode(),po.getClassificationID(), po.getLinkTypeID()) 
	}
	return res;
}

function handleDataContainerPO(revision, po) {
	var res = {
		changetype: 'DataContainer',
		containertype: po.getDataContainerTypeID(),
		containerid: po.getDataContainerID()
		
	}
	return res;
}
function handleDataContainerValuePO(revision, po) {
	var dcHome = revision.getNode().getManager().getHome(com.stibo.core.domain.unstable.datacontainer.DataContainerHome)

	var dc = dcHome.getSingleDataContainerByID(po.getDataContainerID())
	var res = {
		changetype: 'DataContainerValue',
		nodeid: revision.getNode().getID(),
		containerid: po.getDataContainerID(),
		aid: po.getAttributeID(),
		value: dcHome.getSingleDataContainerByID(po.getDataContainerID())
		//value: nvl(getValue(, po.getAttributeID(), ''))
		//Value must probably be from node.getDataContainerByTypeID()
		//then handle multi vs single

	}
	return res;
}


function handleRevision(revision) {
	const partObjects = rcHome.getRevisionChanges(revision.getNode());
	partObjects.forEach(function (/** @type {PartObject} */ partObject) {
		var json = {changes:[]}
		if (partObject.getClass() == com.stibo.core.domain.partobject.ValuePartObject) {
			json.changes.push(handleValuePO(revision, partObject));
		}
		else if (partObject.getClass() == com.stibo.core.domain.partobject.ProductReferencePartObject) {
			//json = handleReferencePO(revision, partObject, 'ProductReference')
		}
		else if (partObject.getClass() == com.stibo.core.domain.partobject.AssetReferencePartObject) {
			//json = handleReferencePO(revision, partObject, 'AssetReference')
		}
		else if (partObject.getClass() == com.stibo.core.domain.partobject.AssetReferenceValuePartObject) {
			//json = handleReferenceValuePO(revision, partObject, 'AssetReferenceValue') 
		}
		else if (partObject.getClass() == com.stibo.core.domain.partobject.ProductReferenceValuePartObject) {
			//json = handleReferenceValuePO(revision, partObject, 'ProductReferenceValue') 
		}
		else if (partObject.getClass() == com.stibo.core.domain.partobject.ClassificationLinkPartObject) {
			//json = handleClassificationLinkPO(revision, partObject)
		}
		else if (partObject.getClass() == com.stibo.core.domain.partobject.NamePartObject) {
			//json = handleNamePO(revision, partObject)
		}
		else if (partObject.getClass() == com.stibo.core.domain.partobject.ParentPartObject) {
			//json = handleParentPO(revision, partObject)
		}
		else if (partObject.getClass() == com.stibo.core.domain.partobject.datacontainer.DataContainerPartObject) {
			//json = handleDataContainerPO(revision, partObject)
		}
		else if (partObject.getClass() == com.stibo.core.domain.partobject.datacontainer.DataContainerValuePartObject) {
			//json = handleDataContainerValuePO(revision, partObject)
		}
		else {
			logger.info("  unknown partObject=" + partObject);
		}
		if (json) {
			addBase(json, revision, partObject)
			appendPartPrint(json)
		}
	});
}


manager.executeInWorkspace('Approved', function (amg) {
	var amgNode = amg.getObjectFromOtherManager(node);
	var allRevisions = amgNode.getRevisions();

	handleRevision(allRevisions.get(0))
	allRevisions.reversed().forEach(function (/** @type {Revision} */ revision) {
		//logger.info(revision.getName())
		//handleRevision(revision)
		first = false;
	});
})


}