/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "FileTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "API Additions" ],
  "name" : "FileTest",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item", "TestItem" ],
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
  }, {
    "contract" : "ProcessStoreBindContract",
    "alias" : "processStore",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,processStore) {

var blob = tmpStore.get("AllItemIDs.txt");
if (blob.isEmpty()) {
    logger.info("Creating new blob");
    blob = tmpStore.create("AllItemIDs.txt");
}
else {
    logger.info("Append to existing blob");
    blob = blob.get();
}

var objectID = node.getID();
blob.write(objectID+"\n");

}