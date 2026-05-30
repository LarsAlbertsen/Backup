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
    "alias" : "obj",
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
  }, {
    "contract" : "ClassificationProductLinkTypeBindContract",
    "alias" : "classificationType",
    "parameterClass" : "com.stibo.core.domain.impl.ClassificationProductLinkTypeImpl",
    "value" : "Display",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (obj,manager,logger,classificationType) {
const queryHome = manager.getHome(com.stibo.query.home.QueryHome);
const conditions = com.stibo.query.condition.Conditions;

const classification = manager.getClassificationHome().getClassificationByID("AcmeProducts");
const toolsProduct = manager.getProductHome().getProductByID("Tools");
const itemObjectType = manager.getObjectTypeHome().getObjectTypeByID("Item");

if (classification == null) {
	throw new java.lang.IllegalArgumentException("Classification not found: AcmeProducts");
}

if (itemObjectType == null) {
	throw new java.lang.IllegalArgumentException("Object type not found: Item");
}

if (toolsProduct == null) {
	throw new java.lang.IllegalArgumentException("Product not found: Tools");
}

const isBelowAcmeProducts = conditions.hierarchy().simpleBelow(classification);
const isBelowToolsProduct = conditions.hierarchy().simpleBelow(toolsProduct);
const isItemObjectType = conditions.objectType(itemObjectType);
const isItemBelowAcmeProductsAndTools = isBelowAcmeProducts
	.and(isBelowToolsProduct)
	.and(isItemObjectType);

const query = queryHome
	.queryFor(com.stibo.core.domain.Product)
	.where(isItemBelowAcmeProductsAndTools)
	.execute();

let matchedProducts = 0;

query.forEach(function(product) {
	matchedProducts += 1;
	logger.info("Matched product: " + product.getID());
	return true;
});

logger.info("Total matched products: " + matchedProducts);

}