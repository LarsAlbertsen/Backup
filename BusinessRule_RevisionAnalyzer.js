/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "RevisionAnalyzer",
  "type" : "BusinessFunction",
  "setupGroups" : [ "RevisionAnalysis" ],
  "name" : "Revision Analyzer",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
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
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "RevisionBindContract",
    "alias" : "revision",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (logger,manager,revision) {
var setup = {
	contextIDs: ['Context1', 'Context2', 'Context3']
}

function log(msg) {
	logger.info('RevisionAnalyzer: ' + msg)
}
var replacer = function (key, value) {
	var returnValue = value;
	try {
		if (value.getClass() !== null) {
			if (value instanceof java.lang.String) {
				returnValue = '' + value;
			} else {
				returnValue = '' + value;
			}
		}
	} catch (err) {
		// No worries... not a Java object
	}
	return returnValue;
};

function getValue(n, attr, defvalue) {
	var v = n.getValue(attr)
	if (v) {
		return v.getSimpleValue()
	}
	return defValue
}

function getAttributeChanges(currentNode, prevNode) {
	var res = []
	if (prevNode) {
		prevNode.getValues().toArray().forEach(function (pv) {
			var aid = pv.getAttribute().getID();
			var cv = getValue(currentNode, aid, '');
			var pv = getValue(prevNode, aid, '')
			//log(aid + ' ' + cv + ' : ' + pv)
			if (cv != pv) {
				res.push({ attributeid: aid, oldvalue: pv, value: cv })
			}
		})
	}
	return res;
}
function getOldName(rev) {
	var currentNode = rev.getNode()
	if (rev.getPredecessor()) {
		var prevNode = rev.getPredecessor().getNode()
		return prevNode.getName()
	}
	return ''
}

function handleNode(cid, node, pnode) {
	if (node instanceof com.stibo.core.domain.Product) {
		var res = {
			contextid: cid,
			id: node.getID(),
			name: node.getTitle(),
			oldName: getOldName(revision),
			url: node.getURL(),
			objtype: node.getObjectType().getID(),
			revision: revision.getName(),
			time: new Date(revision.getCreatedDate()).toISOString(),
			userid: revision.getUserID(),
			attributechanges: getAttributeChanges(node, pnode)
		}
		log(JSON.stringify(res, replacer, 2))
		return JSON.stringify(res, replacer)
	} else if (node instanceof com.stibo.core.domain.Classification) {
		log(node)
		var res = {
			contextid: cid,
			id: node.getID(),
			name: node.getTitle(),
			oldName: getOldName(revision),
			url: node.getURL(),
			objtype: node.getObjectType().getID(),
			revision: revision.getName(),
			time: new Date(revision.getCreatedDate()).toISOString(),
			userid: revision.getUserID(),
			attributechanges: getAttributeChanges(node, pnode)
		}
		log(JSON.stringify(res, replacer, 2))
		return JSON.stringify(res, replacer)
	} else {
		var res = {
			contextid: cid,
			id: node.getID(),
			name: node.getTitle(),
			oldName: getOldName(revision),
			url: node.getURL(),
			objtype: node.getObjectType().getID(),
			revision: revision.getName(),
			time: new Date(revision.getCreatedDate()).toISOString(),
			userid: revision.getUserID(),
			attributechanges: getAttributeChanges(node, pnode)
		}
		log('Unhandled type: ' + node)
		//return res;
		return JSON.stringify(res,replacer)
	}

}


//############################## Main ##############################
var res = []
setup.contextIDs.forEach(cid => {
	manager.executeInContext(cid, (/** @type{Manager} */ ctxman) => {
		var currentNode = revision.getNode()
		var prevNode = revision.getPredecessor()?revision.getPredecessor().getNode():null;
		res.push(handleNode(cid, ctxman.getObjectFromOtherManager(currentNode), ctxman.getObjectFromOtherManager(prevNode)))
	})
})
return '[' + res + ']';

}