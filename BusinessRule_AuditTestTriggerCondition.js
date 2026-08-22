/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AuditTestTriggerCondition",
  "type" : "BusinessCondition",
  "setupGroups" : [ "AuditTest" ],
  "name" : "AuditTestTriggerCondition",
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
    "contract" : "CurrentEventTriggeringWorkspaceBind",
    "alias" : "cetw",
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
exports.operation0 = function (node,logger,cetw,ceq) {
var msg = {}
msg.time = java.time.ZonedDateTime.now(java.time.ZoneId.of("America/New_York")).format(java.time.format.DateTimeFormatter.ISO_DATE_TIME)
//msg.eq = ceq.getID()
//msg.cetw = cetw
msg.node = node.getID()

msg.Bullet01 = node.getValue('Bullet01').getSimpleValue() +''
msg.Bullet02 = node.getValue('Bullet02').getSimpleValue() +''
msg.BulletExt = node.getValue('BulletExtAttr').getSimpleValue() +''

logger.info(JSON.stringify(msg))

return true
}