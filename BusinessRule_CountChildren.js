/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CountChildren",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "CountChildren",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
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
    "alias" : "QueryHome",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (manager,logger,QueryHome,node) {
var c = com.stibo.query.condition.Conditions;

var querySpecification = QueryHome.queryFor(com.stibo.core.domain.Product).where(
     c.hierarchy().simpleBelow(node)
);
//var querySpecification = QueryHome.queryFor(com.stibo.core.domain.Product).where(
//     c.objectType(manager.getObjectTypeHome().getObjectTypeByID("Item"))
//);
var result = querySpecification.execute();
var count = 0;
result.forEach(function(t) {
	count++
	return true	
})
logger.info(count)



/*
var count = 0;

node.queryChildren().forEach(function(child) {
	count++
	return true
})
logger.info(count)
*/
}