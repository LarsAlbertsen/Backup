/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "TransferFile",
  "type" : "BusinessAction",
  "setupGroups" : [ "Extensions" ],
  "name" : "TransferFile",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "ProcessStoreBindContract",
    "alias" : "processStore",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "myFunc",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>TransferFileFunction</BusinessFunction>\n</BusinessFunctionReference>\n",
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
exports.operation0 = function (processStore,myFunc,node) {
var blob = processStore.get("AllItemIDs.txt");
if (blob.isEmpty()) {
    logger.info("Creating new blob");
    blob = processStore.create("AllItemIDs.txt");
}
else {
    logger.info("Append to existing blob");
    blob = blob.get();
}

var objectID = node.getID();
blob.write(objectID+"\n");


// Call the external function
let args1 = new java.util.HashMap();
args1.put("fileID", blob.name());

const assetID = myFunc.evaluate(args1);

logger.info("Got " + assetID);

/*


const value =
        `header1,header2,header3
a1,a2,a3
b1,b2,b3
c1,c2,c3
d1,d2,d3
e1,e2,e3`;

// Create file in tmp store
const csvFile = processStore.create("file.tmp");
csvFile.write(value);
csvFile.close();

// Call the external function
let args1 = new java.util.HashMap();
args1.put("fileID", csvFile.name());

const assetID = myFunc.evaluate(args1);

logger.info(assetID);
*/
}