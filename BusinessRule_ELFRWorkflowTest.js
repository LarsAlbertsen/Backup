/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRWorkflowTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "ELFRWorkflowTest",
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
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
exports.operation0 = function (logger,node,manager) {
var wf = manager.getWorkflowHome().getWorkflowByID('Introduction')

try {
/*
	var wfi = wf.start(node,'hgello')	
	logger.info(wfi)
	wfi.setSimpleVariable('Note', 'sdf')
	logger.info(wfi.getSimpleVariable('Note'))
	wfi.getTasks().toArray().forEach(function(task) {
		logger.info(task.getAssignee())	
	})
	*/
} catch (e) {
	logger.info('ABC' + e.javaException)
	if (e.javaException instanceof com.stibo.core.domain.workflow.WorkflowStartRejectedException) {
		logger.info("ABC Not ready for WF");
	} else {
		logger.info("ABC throwing")
		throw(e); // All other exceptions MUST be re-thrown
	}
}

try {
	/*
	var wfi = wf.start(node,'hgello')	
	logger.info(wfi)
	wfi.setSimpleVariable('Note', 'sdf')
	logger.info(wfi.getSimpleVariable('Note'))
	wfi.getTasks().toArray().forEach(function(task) {
		logger.info(task.getAssignee())	
	})
	*/
} catch (e) {
	logger.info('ABC' + e.javaException)
}


}