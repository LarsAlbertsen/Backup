/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_publishevent",
  "type" : "BusinessAction",
  "setupGroups" : [ "MJAN_BR_Group" ],
  "name" : "ba_publishevent",
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
    "contract" : "EventQueueBinding",
    "alias" : "ep",
    "parameterClass" : "com.stibo.core.domain.impl.eventprocessor.EventProcessorImpl",
    "value" : "step://eventprocessor?id=ep_TestMJAN",
    "description" : null
  }, {
    "contract" : "DerivedEventTypeBinding",
    "alias" : "ev",
    "parameterClass" : "com.stibo.core.domain.impl.eventqueue.DerivedEventTypeImpl",
    "value" : "MJAN_test",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "at",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ATD_ALCO_NoParent",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (ep,ev,at) {
ep.queueDerivedEvent(ev,at);
}