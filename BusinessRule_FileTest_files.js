/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "FileTest_files",
  "type" : "BusinessAction",
  "setupGroups" : [ "API Additions" ],
  "name" : "FileTest_files",
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
var fos = new java.io.FileOutputStream(f);



var objectID = node.getID();
var bytes = (new java.lang.String(objectID+"\n")).getBytes();
fos.write(bytes);

fos.close();
}