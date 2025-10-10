/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "SetGetTranslationStatus",
  "type" : "BusinessAction",
  "setupGroups" : [ "TranslationStatus" ],
  "name" : "SetGetTranslationStatus",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
var nodeTranslation = node.getCurrentTranslation();
if (nodeTranslation==null) {
	logger.info("No translation")
}
else {
	/*
	       "dirty"
            "started"
            "uptodate"
            "none"
	 */
	var newValue = com.stibo.core.domain.NodeTranslationStatus.fromValue("uptodate")
	logger.info("newValue="+newValue)
	nodeTranslation.setTranslationStatus(newValue);
}
}