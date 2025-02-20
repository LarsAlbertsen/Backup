/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRREST",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRREST",
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "GatewayBinding",
    "alias" : "gw",
    "parameterClass" : "com.stibo.core.domain.impl.integrationendpoint.gateway.FrontGatewayIntegrationEndpointImpl",
    "value" : "SELF",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,gw) {


var get = gw.get();
get.path('restapiv2/products/103313');
get.pathQuery({context:'Context1', workspace:'Main'})
get.header('Content-Type','application/octet-stream')
get.header('Accept', '*/*')
var res = get.invokeWithDetails()
logger.info(res.getBody())

var headers = res.getHeaders();
headers.forEach((key, value) => { 
	logger.info(key + '    ' + value); 
});

logger.info(res.getStatusMessage());
logger.info(res.getStatusCode())

logger.info(get.invoke())













var patch = gw.patch()
patch.path('restapiv2/products/103313')
patch.pathQuery({context:'Context1', workspace:'Main'})
patch.header('Content-Type','application/octet-stream')
patch.header('Accept', '*/*')
var body = {name:'test1'}
patch.body(JSON.stringify(body))
patch.bodyContentType('application/json')
logger.info(patch.invokeWithDetails())

}