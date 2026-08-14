/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "SARule-3",
  "type" : "BusinessAction",
  "setupGroups" : [ "SystemAnalyticsGroup" ],
  "name" : "Use of attr SATriggerAttr through bind",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item", "Leaf" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "AttributeBindContract",
    "alias" : "a",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "SATriggerAttr",
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (a,logger,node) {
logger.info(a)
var v = node.getValue(a.getID())
v.setSimpleValue(v.getSimpleValue()+' ')
}