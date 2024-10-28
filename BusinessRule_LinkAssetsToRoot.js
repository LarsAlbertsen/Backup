/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LinkAssetsToRoot",
  "type" : "BusinessAction",
  "setupGroups" : [ "RecycleProject" ],
  "name" : "LinkAssetsToRoot",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "ProductImage" ],
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
    "alias" : "asset",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ClassificationBindContract",
    "alias" : "assetCls",
    "parameterClass" : "com.stibo.core.domain.impl.FrontClassificationImpl",
    "value" : "TestAssets",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (asset,assetCls) {
if (asset.getClassifications().size()<2) {
	logger.info("Adding classification");
	asset.addClassification(assetCls);
}

var allCls = asset.getClassifications().toArray();
for (var i=0; i<allCls.length; i++) {
	var aCls = allCls[i];
	if (!aCls.getID().equals(assetCls.getID())) {
		asset.removeClassification(aCls);
	}
}
asset.approve();

}