/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ReportTestNode",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ReportTest" ],
  "name" : "ReportTestNode",
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
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.List<java.lang.String>",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (node) {
function log(msg) {
	logger.info(msg)
}


function checkNode(n) {
	var orphans = new java.util.ArrayList();
	n.getValues().toArray().forEach(v => {
		if (v.isLocal()) {
			if (v.isOrphan()) {
				orphans.add(v.getAttribute().getID())
			}
		}
 	})
 	return orphans;
}


//############################## MAIN ##############################
var res = checkNode(node)
return res;

}