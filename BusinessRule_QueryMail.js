/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "QueryMail",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "QueryMail",
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
    "contract" : "QueryHomeBindContract",
    "alias" : "qh",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,qh) {
var workflow = manager.getWorkflowHome().getWorkflowByID("CreateItem");
var supplierEnrichState = workflow.getStateByID("Enrich");
var c = com.stibo.query.condition.Conditions;
var querySpecification = qh.queryWorkflowTasks().where (
	c.workflow().eq(workflow)
	.and(c.state().eq(supplierEnrichState))
);

// Execute Query and create an email message with simple HTML table for items.
var query = querySpecification.execute();

}