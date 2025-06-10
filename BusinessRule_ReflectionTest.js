/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ReflectionTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "ReflectionTest",
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
    "contract" : "AttributeBindContract",
    "alias" : "myAttr",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "a1",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (myAttr) {

var validTypes = myAttr.getValidForTypes()
logger.info("validTypes: "+validTypes);
var validObjectTypes = myAttr.getValidForObjectTypes();
logger.info("validObjectTypes: "+validObjectTypes)

}