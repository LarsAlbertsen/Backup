/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "BusinessActionHandler",
  "type" : "BusinessAction",
  "setupGroups" : [ "BusinessActionOIEP" ],
  "name" : "BusinessActionHandler",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
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
    "contract" : "OutboundBusinessProcessorExecutionReportLoggerBindContract",
    "alias" : "report",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,logger,source,result,report) {
function log(msg) {
	logger.info(msg)
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

/*
function checkNode(n) {
	var orphans = {}
	
	n.getValues().toArray().forEach(v => {
		if (v.isLocal()) {
			if (v.isOrphan()) {
				var a = v.getAttribute().getID() + ''
				orphans[a] = v.getSimpleValue()
				logger.info(n.getID() + ' a ' + a) 
			}
		}
	})
	return orphans
}
*/


//log(source.getNode().getManager().getCurrentContext())
//log(source.getNode().getManager().getCurrentWorkspace())

//java.lang.Thread.sleep(1000)
//var res = checkNode(source.getNode())

var startTime = java.lang.System.currentTimeMillis()
result.addMessage(JSON.stringify(
	{
		id: source.getNode().getID(),
		name: source.getNode().getTitle()
	}, replacer))
log('handled ' + source.getNode() + ' in ' + (java.lang.System.currentTimeMillis() - startTime) + ' ms ' + java.lang.System.currentTimeMillis())



}