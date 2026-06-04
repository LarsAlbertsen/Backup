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
 * Business Action: Find products of object type "Item"
 *
 * Bindings required:
 * - ManagerBindContract: manager
 * - LoggerBindContract: logger
 */

const queryHome = manager.getHome(com.stibo.query.home.QueryHome);
const Conditions = com.stibo.query.condition.Conditions;
const Product = com.stibo.core.domain.Product;

const itemType = manager.getObjectTypeHome().getObjectTypeByID("Item");

if (itemType == null) {
    logger.info("Object type 'Item' not found");
} else {
    const specification = queryHome.queryFor(Product).where(
        Conditions.objectType(itemType)
    );

    let count = 0;
    specification.execute().forEach(function (product) {
        if (count >= 10) {
            return false;
        }
        const parts = [];
        let current = product;
        while (current != null) {
            parts.unshift(String(current.getID()));
            current = current.getParent();
        }
        const path = parts.join("/");
        logger.info(count + 1 + ". " + path + ", " + String(product.getName()));
        count++;
        return true;
    });
}

}