/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LAAL_DeleteAndApprove",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LAAL_DeleteAndApprove",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Asset user-type root", "AutoClassificationRuleSet", "BusinessRuleExample", "Configuration", "DEFAULT", "Icon", "Illustration", "InstallationManual", "Item", "JPEGImage", "Logo", "MSDS", "OwnersManual", "PDF", "ProductImage", "ProductVideo", "Swatch", "XML", "stibo.BulkUpdateConfig", "stibo.ExportManagerConfig", "stibo.ImageConversionConfig", "stibo.ImportManagerConfig", "stibo.TranslationConfig", "stibo.ValueSubstitutionTransConfig" ],
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
if (node!=null) {
	node.delete().approve();
}

}