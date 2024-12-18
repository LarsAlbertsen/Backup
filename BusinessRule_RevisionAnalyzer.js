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
  "name" : "RevisionAnalyzer",
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
exports.operation0 = function (logger,revision) {
function log(msg) {
	logger.info('RevisionAnalyzer: ' + msg)
}
var replacer = function(key, value) {
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

function getValue(n,attr, defvalue) {
	var v = n.getValue(attr) 
	if (v) {
		return v.getSimpleValue()
	}
	return defValue
}

function getAttributeChanges(rev) {
	var currentNode = rev.getNode();
	var res = []
	if (rev.getPredecessor()) {
		prevNode = rev.getPredecessor().getNode()
		prevNode.getValues().toArray().forEach(function(pv) {
			
			var aid = pv.getAttribute().getID();
			var cv = getValue(currentNode,aid,'');
			var pv = getValue(prevNode, aid, '')
			if (cv != pv) {
				res.push({attributeid : aid, oldvalue : pv, value : cv})
			}
		})
	}
	return res;
}

//############################## Main ##############################
var node = revision.getNode()
if (node instanceof com.stibo.core.domain.Product || node instanceof com.stibo.core.domain.Classification) {
	var attrChanges = getAttributeChanges(revision)
	if (attrChanges.length > 0) {
		var res = {
			id : node.getID(),
			name : node.getTitle(),
			basetype: node instanceof com.stibo.core.domain.Product ? 'product' : 'classification',
			objtype: node.getObjectType().getID(),
			revision: revision.getName(),
			time : new Date(revision.getCreatedDate()).toISOString(),
			userid : revision.getUserID(),
			attributechanges : attrChanges
		}
		log(JSON.stringify(res,replacer,2))
		return JSON.stringify(res,replacer)
	}
}
	
return null;

}