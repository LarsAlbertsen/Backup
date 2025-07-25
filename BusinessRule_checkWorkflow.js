/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "checkWorkflow",
  "type" : "BusinessAction",
  "setupGroups" : [ "WhiteListTest" ],
  "name" : "checkWorkflow",
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


const wf = manager.getWorkflowHome().getWorkflowByID("TestWF");
logger.info("Got WF="+wf);

const variables = wf.getVariableDefinitions();
logger.info("Got variables="+variables);
var it = variables.iterator();
while (it.hasNext()) {
	var v = it.next();
	logger.info("v="+v.getID());
}

}