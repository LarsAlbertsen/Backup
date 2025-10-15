/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "GCPEventHandleAndPublish",
  "type" : "BusinessAction",
  "setupGroups" : [ "GCPPublish" ],
  "name" : "GCPEventHandleAndPublish",
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
    "contract" : "GatewayBinding",
    "alias" : "gw",
    "parameterClass" : "com.stibo.core.domain.impl.integrationendpoint.gateway.FrontGatewayIntegrationEndpointImpl",
    "value" : "PubSubTest",
    "description" : null
  }, {
    "contract" : "EventProcessorEventBatchBindContract",
    "alias" : "batch",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "msgCreator",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>messageFromNode</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,gw,batch,msgCreator) {
var post = gw.post()

function b64(str) {
	var encoder = java.util.Base64.getEncoder();
	var bytes = new java.lang.String(str).getBytes("UTF-8");
	var encoded = encoder.encodeToString(bytes);
	return encoded;
}

var payload = {
	messages: [] //{data: b64('hello')}
}

batch.getEvents().forEach(function(e) {
	var msg = msgCreator.evaluate({node:e.getNode()}) 
	payload.messages.push({data:b64(msg)})
	return true;
})

var res = post.header('Content-Type', 'application/json').body(JSON.stringify(payload)).invoke()

logger.info(res)

}