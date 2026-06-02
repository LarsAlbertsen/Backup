/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "2026.1VisualCodeTesting",
  "type" : "BusinessAction",
  "setupGroups" : [ "2026.1Testing" ],
  "name" : "2026.1 Testing in Visual Code",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item", "Variant" ],
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
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,logger) {
/**
 * Business Action: Find products of object type Item below classification AcmeSupplier.
 * Uses QueryHome with hierarchy().simpleBelow() — no manual tree traversal.
 */
/** bindings:
- ManagerBindContract: manager
- LoggerBindContract: logger
 */

const c = com.stibo.query.condition.Conditions;
const Product = com.stibo.core.domain.Product;
const queryHome = manager.getHome(com.stibo.query.home.QueryHome);

const acmeSupplierRoot = manager.getClassificationHome().getClassificationByID("AcmeSupplier");
const itemType = manager.getObjectTypeHome().getObjectTypeByID("Item");

if (acmeSupplierRoot == null) {
    logger.info("Classification AcmeSupplier not found");
} else if (itemType == null) {
    logger.info("Object type Item not found");
} else {
    const isBelowAcmeSupplier = c.hierarchy().simpleBelow(acmeSupplierRoot);
    const isItemType = c.objectType(itemType);
    const matchingCondition = isBelowAcmeSupplier.and(isItemType);

    queryHome.queryFor(Product).where(matchingCondition).execute().forEach(function (product) {
        logger.info(String(product.getID()) + " - " + String(product.getName()));
        return true;
    });
}

}