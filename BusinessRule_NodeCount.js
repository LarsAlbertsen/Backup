/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "NodeCount",
  "type" : "BusinessFunction",
  "setupGroups" : [ "AuditReporting" ],
  "name" : "NodeCount",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
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
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "root",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "type",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (logger,manager,root,type) {
/**
 * Counts all products of object type "Item" in the product hierarchy
 * below the bound root node (including root per simpleBelow semantics).
 */

const queryHome = manager.getHome(com.stibo.query.home.QueryHome);
const Product = com.stibo.core.domain.Product;



if (root == null) {
    logger.info("Root node not found");
} else if (type == null) {
    logger.info("Object type Item not found");
} else {
    const isBelowRoot = com.stibo.query.condition.Conditions.hierarchy().simpleBelow(root);
    const isItemType = com.stibo.query.condition.Conditions.objectType(type);

    let itemCount = 0;

    queryHome.queryFor(Product).where(isBelowRoot.and(isItemType)).execute().forEach(function (product) {
        itemCount++;
        return true;
    });

    logger.info("Item count under root: " + itemCount);
}

}