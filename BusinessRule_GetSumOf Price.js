/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "GetSumOf Price",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "GetSumOf Price",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Leaf" ],
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
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {


logger.info("Name "+node.getName());
/*
let totalPrice = 0;
node.getChildren().forEach(child => {
    totalPrice += child.attributes.CostPrice;
});
*/


let totalPrice = 0;
node.getChildren().forEach(child => {
    totalPrice += parseInt(child.getValue("CostPrice").getSimpleValue())
});
logger.info("totalPrice "+totalPrice)


}