/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "query1",
  "type" : "BusinessAction",
  "setupGroups" : [ "AutoRules_Stibo" ],
  "name" : "query1",
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
  }, {
    "contract" : "ClassificationBindContract",
    "alias" : "AcmeSupplierProducts",
    "parameterClass" : "com.stibo.core.domain.impl.FrontClassificationImpl",
    "value" : "AcmeSupplierProducts",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,node,AcmeSupplierProducts) {

var cond = com.stibo.query.condition.Conditions;
var queryHome = manager.getHome(com.stibo.query.home.QueryHome);

var querySpecification = queryHome.queryFor(com.stibo.core.domain.Product).where(cond.objectType(manager.getObjectTypeHome().getObjectTypeByID("Item")).and(cond.valueOf(manager.getAttributeHome().getAttributeByID("RetailPrice")).gt(100)).and(cond.hierarchy().simpleBelow(node)).and(cond.isBelow(AcmeSupplierProducts)));
var result = querySpecification.execute();

result.forEach(function (node) {
    log.info(node.getID());
    return true;
});

}