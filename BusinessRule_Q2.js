/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Q2",
  "type" : "BusinessFunction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "Q2",
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
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "StringBindContract",
    "alias" : "StringArg",
    "parameterClass" : "null",
    "value" : null,
    "description" : "Give me a string"
  }, {
    "contract" : "IntegerBindContract",
    "alias" : "NumberArg",
    "parameterClass" : "null",
    "value" : null,
    "description" : "Give me a number"
  } ]
}
*/
exports.operation0 = function (StringArg,NumberArg) {
return StringArg + " : "+ NumberArg;
}