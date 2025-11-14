/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "BusinessRuleChange",
  "type" : "BusinessAction",
  "setupGroups" : [ "BusinessRuleChange" ],
  "name" : "BusinessRuleChange",
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
    "contract" : "EventProcessorEventBatchBindContract",
    "alias" : "batch",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (batch) {

logger.info("BusinessRuleChange "+batch.size());

let it = batch.getEvents().iterator();
while (it.hasNext()) {
    const event = it.next();
    const eventType = event.getEventType();
    const n = event.getNode()
    logger.info("Event Type: " + eventType + " Node: " + n.getTitle() + " Id: " + n.getID() );
}


}