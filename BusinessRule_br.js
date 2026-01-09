/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "br",
  "type" : "BusinessAction",
  "setupGroups" : [ "ff" ],
  "name" : "br",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "EventProcessorEventBatchBindContract",
    "alias" : "currentEventProcessorEventBatch",
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
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,currentEventProcessorEventBatch,manager) {
// logger bound to Logger
// batch bound to Current Event Processor Event Batch
var it = batch.getEvents().iterator();

while (it.hasNext()) {
                var event = it.next();
                var node = event.getNode();
                if (node) {
                                logger.info("Handling " + event.getNode().getID());          
                }
}



function log(msg) {
	logger.info(msg)
}

log('Batch size ' + currentEventProcessorEventBatch.size())
log('Context ' + manager.getCurrentContext().getID())

currentEventProcessorEventBatch.getEvents().forEach(function(event) {
	//NOTE event.getNode() is tied to defaultcontext
	manager.executeInContext('Context1', mgr => {
		var item = mgr.getObjectFromOtherManager(event.getNode())
		log(item + '    ' + item.getManager().getCurrentContext().getID())
		....do work....
	})
})

}