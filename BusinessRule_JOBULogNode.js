/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "JOBULogNode",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "JOBULogNode",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "msg",
    "message" : "Value is {size}. Minimum requried is 100.",
    "translations" : [ {
      "language" : "da",
      "message" : "Værdien er {size}. Minimum krævet er 100."
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,manager,msg) {
var m = new msg()
m.size = (node.getValue("ELFRNumber2").getValue());
//m.size = (node.getValue("MinimumOrderQty").getValue());
throw m;
}