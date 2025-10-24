/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AI.ImageAnalysis.AnalyzeImageEvent",
  "type" : "BusinessAction",
  "setupGroups" : [ "AI.ImageAnalysis.EP" ],
  "name" : "(AI) Analyze Image Event",
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
    "value" : "step://eventprocessor?id=AI.ImageAnalysis.EventProcessor",
    "description" : null
  }, {
    "contract" : "DerivedEventTypeBinding",
    "alias" : "derivedEvent",
    "parameterClass" : "com.stibo.core.domain.impl.eventqueue.DerivedEventTypeImpl",
    "value" : "AI.ImageAnalysis.AnalyzeImage",
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