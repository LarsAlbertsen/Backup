/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "FileStorage",
  "type" : "BusinessAction",
  "setupGroups" : [ "API Additions" ],
  "name" : "FileStorage",
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
    "contract" : "ProcessStoreBindContract",
    "alias" : "processStore",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "TempStoreBindContract",
    "alias" : "tempStore",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,processStore,tempStore) {

const name = "Lars-10";

let processBlob = processStore.get(name);
logger.info("processBlob = "+processBlob)
if (processBlob.isEmpty()) {
	logger.info("Creating new "+name)
	processBlob = processStore.create(name);
}
else {
    processBlob = processBlob.get();
}
processBlob.write("Hello " + new Date().toISOString() + "\n");
processBlob.close();

printItAll(name);



function printItAll(blobName) {
    const blob = processStore.get(blobName);
    if (!blob.isEmpty()) {
        log.info("Blob found: " + blobName + " lineCount: "+blob.get().lines().toList().size());

    } else {
        log.warning("Blob not found: " + blobName);
    }
}

}