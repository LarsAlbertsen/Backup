/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "StreamingErrorHandlerAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "Streaming" ],
  "name" : "StreamingErrorHandlerAction",
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
    "contract" : "StreamingMessageBindContract",
    "alias" : "message",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "StreamingExecutionReportLoggerBindContract",
    "alias" : "execLogger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,logger,message,execLogger) {
var setup = {
	wf: manager.getWorkflowHome().getWorkflowByID('StreamingNotification')
}
function log(msg) {
	logger.info(msg)
	execLogger.logInfo(msg)
}

function logMeta() {
	log('Context ' + manager.getCurrentContext().getID())
	log('Workspace ' + manager.getCurrentWorkspace().getID())
	var md = message.metadata();
	log('md ' + md)
	log('offset ' + md.offset())
	log('partition ' + md.partition())
	log('topic ' + md.topic())
	var it = md.headers().iterator()
	while (it.hasNext()) {
		var header = it.next()
		log('header ' + new java.lang.String(header.key()) + '=' + new java.lang.String(header.value()))
	}
}

//############################## MAIN ##############################
//Access to headers and basic message information
//logMeta()
//var topic = message.metadata().topic()
//var partition = message.metadata().partition()
//var offset = message.metadata().offset()
try {
	var it = message.metadata().headers().iterator()
	var headers = {}
	while (it.hasNext()) {
		var h = it.next()
		var k = h.key()
		var v = h.value()
		headers[k] = JSON.parse('' + new java.lang.String(h.value()))
	}

	//Content can for example be JSON
	var data = new java.lang.String(message.content());

	//log('DATA: ' + data)
	log('HEADERS: ' + JSON.stringify(headers))
	if (data) {
		var p = manager.getProductHome().getProductByID(JSON.parse(data).id)
		if (p) {
			var wfi = p.getWorkflowInstance(setup.wf)
			if (!wfi) {
				wfi = setup.wf.start(p, 'Errors encountered')
			}
			var notifications = wfi.getValue('WFNotifications')
			var msg = headers['STEPErrorReason'].error.replace(/com.stibo.core.domain.businessrule.evaluate.BusinessRuleRejectException: Wrapped com.stibo.core.domain.impl.validation.exception./,'')
			msg = msg.substring(0,msg.indexOf('(StreamingAction'))
			notifications.addValue(msg)

		}
	}

} catch (e) {
	log('Error processing message: ' + e)
}

}