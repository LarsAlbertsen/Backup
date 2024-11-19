/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateEmptyAsset",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "CreateEmptyAsset",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Product user-type root" ],
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
    "contract" : "ClassificationBindContract",
    "alias" : "assetRoot",
    "parameterClass" : "com.stibo.core.domain.impl.FrontClassificationImpl",
    "value" : "AssetsRoot",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "assetType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Asset user-type root",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (assetRoot,assetType) {
var asset = assetRoot.createAsset("", assetType);
logger.info("asset ID="+asset.getID())
var newAssetContent = new java.io.StringBufferInputStream("");
asset.upload(newAssetContent, "FileName.txt")
}