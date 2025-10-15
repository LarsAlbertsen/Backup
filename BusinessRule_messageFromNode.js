/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "messageFromNode",
  "type" : "BusinessFunction",
  "setupGroups" : [ "GCPPublish" ],
  "name" : "messageFromNode",
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
exports.operation0 = function (logger,node) {
const msg = {};

msg.id = node.getID()
msg.title = node.getTitle();
msg.values = [];

node.getValues().toArray().forEach(function (v) {
	if (v.getSimpleValue()) {
		var doc = {};
		doc[v.getAttribute().getID()] = v.getSimpleValue()
		msg.values.push(doc)		
	}
})
return JSON.stringify(msg)
}