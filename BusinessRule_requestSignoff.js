/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "requestSignoff",
  "type" : "BusinessAction",
  "setupGroups" : [ "eSig" ],
  "name" : "requestSignoff",
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
    "contract" : "WebUiContextBind",
    "alias" : "webui",
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
exports.operation0 = function (webui,logger,manager) {
var wf = manager.getWorkflowHome().getWorkflowByID('eSignature');
if (!wf) throw new RuntimeException('Unknown WF eSignature');

function inSignatureWF(n) {
	return n.isInWorkflow(wf.getID())
}

webui.getSelection().toArray().forEach(function(n) {
	if (!inSignatureWF(n)) {
		wf.start(n, 'Requestiong Signature')	
	}
})
 
}