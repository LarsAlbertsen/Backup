/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "aaa",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "aaa",
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
    "alias" : "product",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ProductplatformScriptHelperBindContract",
    "alias" : "helper",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (product,helper) {

var s1 = java.lang.Runtime.getRuntime().freeMemory()	
var s2 = java.lang.Runtime.getRuntime().maxMemory()
var s3 = java.lang.Runtime.getRuntime().totalMemory()

logger.info("s1 "+s1)
logger.info("s2 "+s2)
logger.info("s3 "+s3)


var children = product.getChildren()

helper.createAttribute(product.getManager(), "Lars-1", "Lars-Name-1");

}