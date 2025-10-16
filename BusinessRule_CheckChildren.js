/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CheckChildren",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "CheckChildren",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "DiscontinuedProducts", "Family", "GoldenRecords", "Item", "Level1", "Level2", "Level3", "Level4", "ObjTypeToMove", "Product Folder", "Product user-type root", "ProductOverrides", "ProductRoot", "Products", "SKU", "Tree", "Variant" ],
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

var children = new Array();
node.queryChildren().forEach(function (child) {
    children.push(child.getID());
    return true
});
logger.info("Child count: " + children.length);
}