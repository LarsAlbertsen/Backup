/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "approveEntity",
  "type" : "BusinessAction",
  "setupGroups" : [ "ApproveActions" ],
  "name" : "approveEntity",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "MEssage", "Message_WorkspaceRevisable" ],
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
    "alias" : "entity",
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
exports.operation0 = function (entity,LastEdited_manuel) {

var v = entity.getValue("LastEdited").getSimpleValue();
logger.info("approveEntity "+entity.getID()+" "+v);
//node.setSimpleValue(LastEdited_manuel, v);

var lastEditDate = entity.getRevision().getEditedDate()
logger.info(lastEditDate)
entity.setSimpleValue(LastEdited_manuel, lastEditDate.toGMTString())

}