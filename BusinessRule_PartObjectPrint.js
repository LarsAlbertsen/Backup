/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "PartObjectPrint",
  "type" : "BusinessAction",
  "setupGroups" : [ "Snapshot" ],
  "name" : "PartObjectPrint",
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

function appendPartPrint(json) {
	const writer = new java.io.BufferedWriter(new java.io.FileWriter(partPrintFilePath, true));
	try {
		writer.write(JSON.stringify(json));
		writer.newLine();
	}
	finally {
		writer.close();
	}
}

function nvl(v) {
	return v?v:''
}

function getUserID(node, po) {
    var editRev = node.getEditRevision(po);
    var userId = editRev != null ? editRev.getUserID() : "";
    return userId;
}

function getValue(n,aid, defVal='') {
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
	json.userid = getUserID(revision.getNode(),po)
	json.revid = revision.getName()
	json.time = new Date(revision.getEditedDate()).toISOString()
}


function handleValuePO(revision, po) {
	if ((po.getAttributeID()+'').startsWith('0bits.legacy.')) {
		logger.info(po.getAttributeID())
		return null
	}
	var n = revision.getNode()
	// current context
	var res = {
		changetype:'Value',	
		aid:po.getAttributeID(),
		value : nvl(getValue(n, po.getAttributeID(), ''))
	}
	
	return res;
}

function handleNamePO(revision, po) {
	var n = revision.getNode();
	var res =  {
		changetype:'Name',
		name: nvl(revision.getNode().getName(), '')
	}
	return res;
}

function handleRevision(revision) {
    
    const partObjects = rcHome.getRevisionChanges(revision.getNode());
    partObjects.forEach(function(/** @type {PartObject} */ partObject) {
    	var json = null
        if (partObject instanceof com.stibo.core.domain.partobject.ValuePartObject) {
		json = handleValuePO(revision, partObject);
        }
        else if (partObject instanceof com.stibo.core.domain.partobject.ClassificationLinkPartObject) {
        	
        }
        else if (partObject instanceof com.stibo.core.domain.partobject.NamePartObject) {
		json = handleNamePO(revision, partObject)
        }
        else {
            logger.info("  unknown partObject="+partObject);
        }
        if (json) {
		addBase(json, revision, partObject)
		appendPartPrint(json)
        }
    });
}


manager.executeInWorkspace('Main', function(amg){
	var amgNode = amg.getObjectFromOtherManager(node);
	var allRevisions = amgNode.getRevisions();
	allRevisions.reversed().forEach(function(/** @type {Revision} */ revision) {
		//if (revision.getName() == '0.15') {
		handleRevision(revision)
		//}
		//handleRevision(revision, first)		
		first = false;
	});
})


}