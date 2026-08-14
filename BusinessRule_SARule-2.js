/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "SARule-2",
  "type" : "BusinessAction",
  "setupGroups" : [ "SystemAnalyticsGroup" ],
  "name" : "Use of attribute group SystemAnalyticsTriggerAttributeGroup through direct use",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
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
exports.operation0 = function (manager,logger,node) {
var ag = manager.getAttributeGroupHome().getAttributeGroupByID('SystemAnalyticsTriggerAttributeGroup')

ag.getAttributes().forEach(function (a) {
    logger.info(a)
    var v = node.getValue(a.getID())
    v.setSimpleValue(v.getSimpleValue()+ ' ')
})
}