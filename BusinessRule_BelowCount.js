/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "BelowCount",
  "type" : "BusinessFunction",
  "setupGroups" : [ "AuditReporting" ],
  "name" : "BelowCount",
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
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "root",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (logger,manager,root) {

const queryHome = manager.getHome(com.stibo.query.home.QueryHome);
const Node = com.stibo.core.domain.Node;

const map = {}


if (root == null) {
    logger.info("Root node not found");
} else {
    const isBelowRoot = com.stibo.query.condition.Conditions.hierarchy().simpleBelow(root);

	queryHome.queryFor(Node).where(isBelowRoot).execute().forEach(function (n) {
		var key = n.getObjectType().getID();
		map[key] ? map[key]++ : map[key] = 1
		return true;
	});

    logger.info("Count under root: " + JSON.stringify(map,null, 2));
}

}