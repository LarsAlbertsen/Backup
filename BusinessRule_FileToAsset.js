/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "FileToAsset",
  "type" : "BusinessAction",
  "setupGroups" : [ "Snapshot" ],
  "name" : "FileToAsset",
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AssetBindContract",
    "alias" : "asset",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,manager,asset) {
var filePath = "/shared/upload/server-side-delivery/laal/PartPrint.txt";

function uploadFileToAsset(filePath, targetAsset) {
    if (targetAsset == null) {
        throw new Error("No asset is available to receive the uploaded content.");
    }

    const sourceFile = new java.io.File(filePath);
    if (!sourceFile.exists()) {
        throw new java.io.FileNotFoundException(filePath);
    }

    const inputStream = new java.io.FileInputStream(sourceFile);
    try {
		asset.upload(inputStream, "PartPrint.txt")
    } finally {
        inputStream.close();
    }
}

uploadFileToAsset(filePath, asset);


}