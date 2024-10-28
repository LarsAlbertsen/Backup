/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_MJANtest",
  "type" : "BusinessAction",
  "setupGroups" : [ "MJAN_BR_Group" ],
  "name" : "ba_MJANtest",
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
    "contract" : "UserBindContract",
    "alias" : "usr",
    "parameterClass" : "com.stibo.core.domain.impl.UserImpl",
    "value" : "SERVICE-ACCOUNT-INTEGRATION",
    "description" : null
  }, {
    "contract" : "GatewayBinding",
    "alias" : "gateway",
    "parameterClass" : "com.stibo.core.domain.impl.integrationendpoint.gateway.FrontGatewayIntegrationEndpointImpl",
    "value" : "giep_CertCheck",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (usr,gateway) {
var request = gateway.get();
var response;
response = request.invoke();
logger.info(response);
}