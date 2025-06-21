/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "FindUserTasksUnclaim",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "FindUserTasksUnclaim",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Group user-type root", "Operator user-type root" ],
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "user",
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
    "alias" : "qh",
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
exports.operation0 = function (user,logger,qh,manager) {
var c = com.stibo.query.condition.Conditions;
var query = qh.queryWorkflowTasks().where(c.assignee().eq(user))
var cursor = query.execute()

cursor.forEach(function(task) {
	logger.info(task.getNode().getID() + ':  ' + task.getWorkflowInstance().getWorkflow().getID() + '.' + task.getState().getID())
	task.reassign(manager.getUserHome().getUserByID('ELFR2'))
	return true;	
})


}