/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "FindProductUnderSupplier",
  "type" : "BusinessAction",
  "setupGroups" : [ "AutoRules" ],
  "name" : "FindProductUnderSupplier",
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
  }, {
    "contract" : "QueryHomeBindContract",
    "alias" : "queryHome",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,logger,queryHome) {

const CLASSIFICATION_ID = "AcmeSupplierProducts";
const PARENT_PRODUCT_ID = "106796";
const OBJECT_TYPE_ID = "Item";
const ATTRIBUTE_ID = "ItemUniqueID";
const ATTRIBUTE_VALUE = "Lars-4";

function findProducts() {
    const classification = manager.getClassificationHome().getClassificationByID(CLASSIFICATION_ID);
    if (!classification) {
        logger.error("Classification not found: " + CLASSIFICATION_ID);
        return;
    }

    const parentProduct = manager.getProductHome().getProductByID(PARENT_PRODUCT_ID);
    if (!parentProduct) {
        logger.error("Parent product not found: " + PARENT_PRODUCT_ID);
        return;
    }

    const itemObjectType = manager.getObjectTypeHome().getObjectTypeByID(OBJECT_TYPE_ID);
    if (!itemObjectType) {
        logger.error("Object type not found: " + OBJECT_TYPE_ID);
        return;
    }

    const attribute = manager.getAttributeHome().getAttributeByID(ATTRIBUTE_ID);
    if (!attribute) {
        logger.error("Attribute not found: " + ATTRIBUTE_ID);
        return;
    }

    const c = com.stibo.query.condition.Conditions;
    const querySpecification = queryHome.queryFor(com.stibo.core.domain.Product)
        .where(
            c.hierarchy().simpleBelow(classification)
            .and(c.hierarchy().simpleBelow(parentProduct))
            .and(c.objectType(itemObjectType))
            .and(c.valueOf(attribute).eq(ATTRIBUTE_VALUE))
        );

    const result = querySpecification.execute();
    result.forEach(function(product) {
        logger.info("Found product: " + product.getName());
        return true;
    });
}

findProducts();

}