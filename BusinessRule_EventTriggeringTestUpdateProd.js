/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "EventTriggeringTestUpdateProd",
  "type" : "BusinessAction",
  "setupGroups" : [ "EventTriggeringTest" ],
  "name" : "EventTriggeringTestUpdateProd",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
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
exports.operation0 = function (node) {
var val = node.getValue('Bullet05')
val.setSimpleValue(val.getSimpleValue() + '5')
val = node.getValue('Bullet06')
val.setSimpleValue(val.getSimpleValue() + '6')
val = node.getValue('Bullet07')
val.setSimpleValue(val.getSimpleValue() + '7')
val = node.getValue('Bullet08')
val.setSimpleValue(val.getSimpleValue() + '8')
val = node.getValue('Bullet09')
val.setSimpleValue(val.getSimpleValue() + '9')



}