/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Test1",
  "type" : "BusinessAction",
  "setupGroups" : [ "AutoRules" ],
  "name" : "Test1",
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
exports.operation0 = function (manager,node) {
const conditions = com.stibo.query.condition.Conditions;

const acmeProductsClassification = manager.getClassificationHome().getClassificationByID("AcmeProducts");
const itemObjType = manager.getObjectTypeHome().getObjectTypeByID("Item");
const colorAttr = manager.getAttributeHome().getAttributeByID("Color");
const priceAttr = manager.getAttributeHome().getAttributeByID("Price");

const isItemType = conditions.objectType(itemObjType);
const isUnderAcmeProducts = conditions.hierarchy().simpleBelow(acmeProductsClassification);
const isColorNotRed = conditions.valueOf(colorAttr).neq("Red");
const isPriceAbove10 = conditions.valueOf(priceAttr).numeric().gt("10", null);

const queryHome = manager.getHome(com.stibo.query.home.QueryHome);
const querySpecification = queryHome.queryFor(com.stibo.core.domain.Product).where(
    isItemType.and(isUnderAcmeProducts).and(isColorNotRed).and(isPriceAbove10)
);

let count = 0;
querySpecification.execute().forEach(function (product) {
    count++;
    return true;
});

logger.info("Products of type 'Item' linked to 'AcmeProducts' with Color != 'Red': " + count);

}