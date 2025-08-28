/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ExportLookup",
  "type" : "BusinessAction",
  "setupGroups" : [ "ExportRelated" ],
  "name" : "Export Lookup",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager) {


const lookupHome = manager.getHome(com.stibo.lookuptable.domain.LookupTableHome)

logger.info("Lookup Home: " + lookupHome)
const asset = manager.getAssetHome().getAssetByID("My Lookup Table");
logger.info("Asset: " + asset)  

let file = new java.io.File("/tmp/LookupTable.csv");
const output = new java.io.FileOutputStream(file);
asset.download(output);

}