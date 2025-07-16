/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "EventTriggerTestCreateEvent",
  "type" : "BusinessAction",
  "setupGroups" : [ "EventTriggeringTest" ],
  "name" : "EventTriggerTestCreateEvent",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
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
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "EventQueueBinding",
    "alias" : "ceq",
    "parameterClass" : "com.stibo.core.domain.impl.eventprocessor.EventProcessorImpl",
    "value" : "step://eventprocessor?id=EventTriggeringTest2",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,node,ceq,manager) {
for (var i = 1; i <=100; i++) {
	for (var x = 1; x <= 5; x++) {
		ceq.republish(manager.getProductHome().getProductByID("BAProduct-" + x))
	}
	for (var x = 5; x >= 1; x--) {
		ceq.republish(manager.getProductHome().getProductByID("BAProduct-" + x))
	}	
}

}