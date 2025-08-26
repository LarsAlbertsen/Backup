/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ReadBlob",
  "type" : "BusinessAction",
  "setupGroups" : [ "API Additions" ],
  "name" : "ReadBlob",
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

var allIDs = new Set();
var blob = processStore.get("AllItemIDs.txt");
if (!blob.isEmpty()) {
    logger.info("Using existing blob");
    var lineStream = blob.get().lines();
    var iterator = lineStream.iterator();
    let lineCount = 0;
    while (iterator.hasNext()) {
        lineCount++;
        let str = iterator.next();
        allIDs.add(str);
        //logger.info(""+lineCount+"\t"+str);
    }
	logger.info("linCount "+lineCount);
    logger.info("Total IDs: " + allIDs.size);   
}
else {
	logger.info("No blob found");
}

}