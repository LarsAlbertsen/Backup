/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CheckInheritedRefs",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "CheckInheritedRefs",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "BusinessEntitiesRoot", "BusinessEntityExternal", "BusinessEntityGroup", "Environment", "Item", "OtherEnvironment", "PrismBaseLicense" ],
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
exports.operation0 = function (node,manager) {

var booleanRef = manager.getReferenceTypeHome().getReferenceTypeByID("SystemBooleanLimit");
var br = node.getReferences(booleanRef)
br.forEach(function(/** @type{Reference}*/ref) {
    logger.info("QRef: " + ref.getReferenceTypeString());	
});


}