/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AI.TextGeneration.GenProdEvent",
  "type" : "BusinessAction",
  "setupGroups" : [ "AI.TextGeneration.EP" ],
  "name" : "(AI) Generate Product Description Event",
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
    "contract" : "EventQueueBinding",
    "alias" : "eventQueue",
    "parameterClass" : "com.stibo.core.domain.impl.eventprocessor.EventProcessorImpl",
    "value" : "step://eventprocessor?id=AI.TextGeneration.ProdDescEventProcessor",
    "description" : null
  }, {
    "contract" : "DerivedEventTypeBinding",
    "alias" : "derivedEvent",
    "parameterClass" : "com.stibo.core.domain.impl.eventqueue.DerivedEventTypeImpl",
    "value" : "AI.TextGeneration.GenerateProdDesc",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "currentObject",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (eventQueue,derivedEvent,currentObject) {
eventQueue.queueDerivedEvent(derivedEvent, currentObject);
}