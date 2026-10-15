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
const queryHome = manager.getHome(com.stibo.query.home.QueryHome);
const Conditions = com.stibo.query.condition.Conditions;
const Product = com.stibo.core.domain.Product;
const acmeProducts = manager.getClassificationHome().getClassificationByID("AcmeSupplierProducts");

if (acmeProducts == null) {
	throw new Error("Classification 'AcmeProducts' does not exist.");
}

const isBelowAcmeProducts = Conditions.hierarchy().simpleBelow(acmeProducts);

queryHome.queryFor(Product).where(isBelowAcmeProducts).execute().forEach(function (product) {
	logger.info(String(product.getName()));
	return true;
});

}