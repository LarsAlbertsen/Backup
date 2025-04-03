/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "updateEditDateBatch",
  "type" : "BusinessAction",
  "setupGroups" : [ "ApproveActions" ],
  "name" : "updateEditDateBatch",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "MEssage", "Message_WorkspaceRevisable" ],
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
    "alias" : "eventBatch",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "LastEdited_manuel",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "LastEdited_manuel",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (eventBatch,LastEdited_manuel) {
logger.info("Lars");

let it = eventBatch.getEvents().iterator();
while (it.hasNext()) {
    const curEvent = it.next();
    const curNode = curEvent.getNode()
    logger.info("CurEvent "+curNode.getName())
	const lastEditDate = curNode.getRevision().getEditedDate()
	logger.info(lastEditDate)
	curNode.setSimpleValue(LastEdited_manuel, lastEditDate.toGMTString())
	
}
/*
var v = entity.getValue("LastEdited").getSimpleValue();
logger.info("approveEntity "+entity.getID()+" "+v);
//node.setSimpleValue(LastEdited_manuel, v);

var lastEditDate = entity.getRevision().getEditedDate()
logger.info(lastEditDate)
entity.setSimpleValue(LastEdited_manuel, lastEditDate.toGMTString())
*/
}