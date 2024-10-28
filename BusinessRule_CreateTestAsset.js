/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateTestAsset",
  "type" : "BusinessAction",
  "setupGroups" : [ "RecycleProject" ],
  "name" : "CreateTestAsset",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "TestAssetsSubFolder" ],
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
    "contract" : "ObjectTypeBindContract",
    "alias" : "assetType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "ProductImage",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,assetType) {
var createCount = 0;
var n = 1000;
while (node.getAssets().size()<n) {
	//logger.info("Asset Count "+node.getAssets().size());
	node.createAsset("",assetType.getID());
	createCount++;
}
logger.info("Created "+createCount+" assets");

}