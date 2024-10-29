/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "HandlerTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "BusinessActionIIEP" ],
  "name" : "HandlerTest",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger) {
var data = new java.lang.String('{ "data" : [ {"aaaa" : "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"} ] }')

var json = JSON.parse(data)
logger.info(json.data.length)
}