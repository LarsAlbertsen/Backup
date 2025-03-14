/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "DeleteOIEP",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "DeleteOIEP",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Product user-type root" ],
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
exports.operation0 = function (manager) {

var IntegrationEndpointHome = manager.getClass().getMethod("getIntegrationEndpointHome").invoke(manager);
logger.info(IntegrationEndpointHome)

var oiep = IntegrationEndpointHome.getClass().getMethod("getOutboundIntegrationEndpointByID", [java.lang.String]).invoke(IntegrationEndpointHome, "LarsTest3");

logger.info(oiep)

oiep.getClass().getMethod("forcedelete", java.lang.Boolean.TYPE).invoke(oiep, true)

/*

logger.info(attr.getTitle() + " isUsedByUniqueKey " + isUsedByUniqueKey(attr))

function isUsedByUniqueKey(pAttr) {
	var method = pAttr.getClass().getMethod("isUsedByUniqueKey");
	var oo = method.invoke(pAttr);
	if ("false".equals(oo)) {
		return false;
	}
	else {
		return true;
	}
}

*/
}