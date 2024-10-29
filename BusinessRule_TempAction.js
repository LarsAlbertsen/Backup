/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "TempAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "Workflows" ],
  "name" : "TempAction",
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
    "alias" : "item",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "WebUI",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "CurrentWorkflowBindContract",
    "alias" : "cw",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "WorkflowStateBinding",
    "alias" : "state",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (item,manager,WebUI,cw,state) {
function log(m) {
	logger.info('TempAction: ' + m)
}

var errors = []

log('item='+item)
log('screenid='+WebUI.getScreenId())
log('getSelection='+WebUI.getSelection())
log('getSelectedSetOfNodes='+WebUI.getSelectedSetOfNodes())
log('CurrentWF='+cw)
log('state='+state)

function handle(n) {
	var wfi = n.getWorkflowInstanceByID('TempWF')
	if (wfi) {
		var task = wfi.getTaskByID('State-2')
		if ('TempAction: ' + task) {
			var tr = task.triggerByID('Submit', 'by rule')
			if (tr.isRejectedByScript()) {
				errors.push(tr.getScriptMessage())
			}
		}
	}
	
}
if (item) {
	handle(item)
} else {
	WebUI.getSelection().forEach(function(n) {
		handle(n)	
	})
}
if (errors.length > 0) {
	WebUI.showAlert('WARNING', 'Error', errors.join('<br/>'))
}

}