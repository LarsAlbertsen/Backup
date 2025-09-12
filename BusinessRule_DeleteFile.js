/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "DeleteFile",
  "type" : "BusinessAction",
  "setupGroups" : [ "API Additions" ],
  "name" : "DeleteFile",
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


var f = new java.io.File("/shared/workarea/AllItemIDs.txt");
if (f.exists()) {
	logger.info("Deleteing "+f.getAbsolutePath()) 
	f.delete()
}
else {
	logger.info("Does not exist "+f.getAbsolutePath()) 
}

}