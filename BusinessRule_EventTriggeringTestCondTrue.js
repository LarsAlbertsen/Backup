/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "EventTriggeringTestCondTrue",
  "type" : "BusinessCondition",
  "setupGroups" : [ "EventTriggeringTest" ],
  "name" : "EventTriggeringTestCondTrue",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
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
  }, {
    "contract" : "CurrentEventQueueBinding",
    "alias" : "ceq",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,node,ceq) {
var msg = {}
msg.time = Date.now()
msg.eq = ceq.getID()
msg.node = node.getID()
msg.ItemUniqueID = node.getValue('ItemUniqueID').getSimpleValue()
msg.Bullet05 = node.getValue('Bullet05').getSimpleValue()
msg.valCount = 0;
node.getValues().toArray().forEach(function(val) {
	if (val.getSimpleValue()) {
		msg.valCount++
	}
})
logger.info(JSON.stringify(msg))

return true
}