/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "countSubProductsRecursively",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "countSubProductsRecursively",
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

var cc = node.getClass().getMethod("countSubProductsRecursively").invoke(node)
logger.info("reflection = "+count)

//("var method = pAttr.getClass().getMethod("isUsedByUniqueKey");
//	var oo = method.invoke(pAttr);


// com.stibo.core.domain.impl.FrontProductImpl#countSubProductsRecursively()

const count = node.countSubProductsRecursively();
logger.info("getMethod = "+count);

}