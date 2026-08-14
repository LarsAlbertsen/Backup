/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "SARule-1",
  "type" : "BusinessAction",
  "setupGroups" : [ "SystemAnalyticsGroup" ],
  "name" : "Use of attribute group SystemAnalyticsTriggerAttributeGroup through bind",
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
    "contract" : "AttributeGroupBindContract",
    "alias" : "ag",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "SystemAnalyticsTriggerAttributeGroup",
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
exports.operation0 = function (ag,logger,node) {
ag.getAttributes().forEach(function (a) {
    logger.info(a)
    var v = node.getValue(a.getID());
    v.setSimpleValue(v.getSimpleValue()+' ')
})
}