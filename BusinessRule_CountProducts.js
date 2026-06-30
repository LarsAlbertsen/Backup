/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CountProducts",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "CountProducts",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Product user-type root" ],
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
/**
 * Business Action: Count products by object type and print totals.
 *
 * Bindings:
 * - ManagerBindContract: manager
 * - LoggerBindContract: logger
 */

const queryHome = manager.getHome(com.stibo.query.home.QueryHome);
const Conditions = com.stibo.query.condition.Conditions;
const Product = com.stibo.core.domain.Product;

const topProduct = manager.getProductHome().getTopProduct();
const isInProductHierarchy = Conditions.hierarchy().simpleBelow(topProduct);

const productQuery = queryHome.queryFor(Product).where(isInProductHierarchy).execute();
const countsByObjectType = {};

productQuery.forEach(function (product) {
	const objectType = product.getObjectType();
	const objectTypeId = String(objectType.getID());

	if (countsByObjectType[objectTypeId] == null) {
		countsByObjectType[objectTypeId] = 0;
	}
	countsByObjectType[objectTypeId] = countsByObjectType[objectTypeId] + 1;

	return true;
});

const objectTypeIds = Object.keys(countsByObjectType).sort(function (a, b) {
	const countDiff = countsByObjectType[b] - countsByObjectType[a];
	if (countDiff !== 0) {
		return countDiff;
	}
	return a.localeCompare(b);
});
objectTypeIds.forEach(function (objectTypeId) {
	logger.info(objectTypeId + ": " + countsByObjectType[objectTypeId]);
});

}