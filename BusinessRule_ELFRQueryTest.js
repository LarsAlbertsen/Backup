/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRQueryTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRQueryTest",
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
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,manager) {
const queryHome = manager.getHome(com.stibo.query.home.QueryHome);
const Conditions = com.stibo.query.condition.Conditions;
const Product = com.stibo.core.domain.Product;

const objectTypeHome = manager.getObjectTypeHome();
const attributeHome = manager.getAttributeHome();

const itemType = objectTypeHome.getObjectTypeByID("Item");
const bullet01Attribute = attributeHome.getAttributeByID("Bullet01");

if (itemType == null) {
	logger.info("Object type Item not found");
} else if (bullet01Attribute == null) {
	logger.info("Attribute Bullet01 not found");
} else {
	const isItemType = Conditions.objectType(itemType);
	const bullet01StartsWithHello = Conditions.valueOf(bullet01Attribute).like("Bullet*");
	const matchesTypeAndBullet = isItemType.and(bullet01StartsWithHello);

	const query = queryHome.queryFor(Product).where(matchesTypeAndBullet).execute();
	query.forEach(function (product) {
		logger.info(String(product.getID()));
		return true;
	});
}
}