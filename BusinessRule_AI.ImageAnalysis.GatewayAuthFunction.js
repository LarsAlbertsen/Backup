/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AI.ImageAnalysis.GatewayAuthFunction",
  "type" : "BusinessFunction",
  "setupGroups" : [ "AI.ImageAnalysis.Endpoint" ],
  "name" : "AI Image Analysis Gateway Authentication Function",
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
    "contract" : "SecretBindContract",
    "alias" : "apiKey",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.Map<java.lang.String, java.lang.String>",
  "functionParameterBinds" : [ ]
}
*/
exports.operation0 = function (apiKey) {
var resultMap = new java.util.HashMap();
resultMap.put("Ocp-Apim-Subscription-Key",apiKey);
resultMap.put("Parameter:api-version","<insert-api-version>");

return resultMap;
}