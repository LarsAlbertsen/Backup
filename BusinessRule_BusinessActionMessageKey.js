/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "BusinessActionMessageKey",
  "type" : "BusinessFunction",
  "setupGroups" : [ "BusinessActionOIEP" ],
  "name" : "BusinessActionMessageKey",
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
  "functionReturnType" : "java.util.Map<java.lang.String, java.lang.String>",
  "functionParameterBinds" : [ {
    "contract" : "StringBindContract",
    "alias" : "msg",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (logger,msg) {
/*
var doc = JSON.parse(msg)
var map = new java.util.HashMap()
map.put('MessageKey', doc[0].id)
map.put('Name', doc[0].name)
return map
*/


var map = new java.util.HashMap()
map.put('MessageKey', 'a key')
return map

}