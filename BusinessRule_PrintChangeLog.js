/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "PrintChangeLog",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "Print Change Log",
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
exports.operation0 = function (node) {
var manager = node.getManager()

var attr = manager.getAttributeHome().getAttributeByID('a1')

var changeLogs = attr.getChangeLogsOrdered()
//logger.info('changeLogs '+changeLogs)

for (var i=0;i<changeLogs.size(); i++) {
	var l = changeLogs.get(i)
	logger.info(l.formattedAsText());
}

}