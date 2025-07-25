/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "checkValidator",
  "type" : "BusinessAction",
  "setupGroups" : [ "WhiteListTest" ],
  "name" : "checkValidator",
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
exports.operation0 = function (manager,node) {


const allValues = node.getValues();

allValues.forEach(function(v) {
    const attr = v.getAttribute();
    logger.info("Attribute "+attr.getID()+" "+attr.getValidatorName());
    if (attr.hasLOV()) {
    		var lov = attr.getListOfValues()
    		logger.info("  hasLov "+lov.getValidatorName());
    }
})
}