/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "updateNodes",
  "type" : "BusinessAction",
  "setupGroups" : [ "WhiteListTest" ],
  "name" : "updateNodes",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
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
exports.operation0 = function (manager,node) {

const collection = manager.getNodeCollectionHome().getNodeCollectionByID("116728")
logger.info("Collection "+collection)

collection.updateNodes(false)
logger.info("Started update")

let count = 0;
collection.queryNodes().forEach(function(node) {
    count++;
    //handle node here
    return true;
});

logger.info("NodeCount "+count)
}