/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "NumberOfObjects",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "NumberOfObjects",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,logger) {

/** @type{Conditions} */
const c = com.stibo.query.condition.Conditions;
const queryHome = manager.getHome(com.stibo.query.home.QueryHome);
const topProduct = manager.getProductHome().getTopProduct();
const isBelowTopProduct = c.hierarchy().simpleBelow(topProduct);
const query = queryHome.queryFor(com.stibo.core.domain.Product).where(isBelowTopProduct).execute();

const topProductId = String(topProduct.getID());
const logIntervalMillis = 1000;
let nextLogAt = java.lang.System.currentTimeMillis() + logIntervalMillis;
let productCount = 0;

query.forEach(function(product) {
	if (String(product.getID()) !== topProductId) {
		productCount++;
	}
	const currentTime = java.lang.System.currentTimeMillis();
	if (currentTime >= nextLogAt) {
		logger.info("Product count so far: " + productCount);
		nextLogAt = currentTime + logIntervalMillis;
	}
	return true;
});

logger.info("Product count: " + productCount);

}