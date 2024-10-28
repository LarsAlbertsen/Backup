/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LAAL_ApproveDelete",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LAAL_ApproveDelete",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager) {

var p1 = manager.getProductHome().getProductByID("24050308");
logger.info("p1="+p1);
if (p1!=null) {
	logger.info("delete p1");
	var p2 = p1.delete()
	logger.info("p2="+p2);
	/*if (p2!=null) {
		logger.info("approve p2");
		var p3 = p2.approve();
		if (p3!=null) {
			logger.info("p3="+p3);
		}
	}*/
}



}