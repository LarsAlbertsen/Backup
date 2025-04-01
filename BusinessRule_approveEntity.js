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
  "onApprove" : "Trigger",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
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
exports.operation0 = function (node,LastEdited_manuel) {

var v = node.getValue("LastEdited").getSimpleValue();
node.setSimpleValue(LastEdited_manuel, v);

logger.info("approveEntity "+node.getID()+" "+v);

}