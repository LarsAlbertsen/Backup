/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "OrphanHandler",
  "type" : "BusinessAction",
  "setupGroups" : [ "OrphanTest" ],
  "name" : "OrphanHandler",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorNodeHandlerSourceBindContract",
    "alias" : "source",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorNodeHandlerResultBindContract",
    "alias" : "result",
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
exports.operation0 = function (logger,source,result,manager) {
function checkNode(n) {
	var orphans = []
	n.getValues().toArray().forEach(v => {
		if (v.isLocal()) {
			if (v.isOrphan()) {
				var a = v.getAttribute().getID() + ''
				orphans.push(a)
			}
		}
	})
	return orphans
}

var fullResult = null;

manager.getContextHome().getContexts().forEach(function(context) {
	manager.executeInContext(context.getID(), function(ctxman) {
		var n = ctxman.getObjectFromOtherManager(source.getNode())
		var res = checkNode(n)
		if (res.length > 0) {
			if (!fullResult) {
				fullResult = {'node':n.getID()}
			}
			fullResult[context.getID()] = res
		}
	})
	return true
})





if (fullResult) {
	//logger.info(JSON.stringify(fullResult))
	result.addMessage(JSON.stringify(fullResult))
}

}