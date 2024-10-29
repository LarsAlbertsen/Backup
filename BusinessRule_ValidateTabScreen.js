/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ValidateTabScreen",
  "type" : "BusinessCondition",
  "setupGroups" : [ "WebUIRules" ],
  "name" : "ValidateTabScreen",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
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
  }, {
    "contract" : "DataIssuesContextBind",
    "alias" : "dir",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "elfra",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ELFRA",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "attr",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ELFRA",
    "description" : null
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "ui",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,manager,dir,elfra,attr,ui) {
logger.info('ValidateTabScreen elfra=' + elfra) 

if ('hide' == (''+elfra)) {
	logger.info('ValidateTabScreen generating issue') 
	dir.addWarning('this is a test warning', node, attr);
	return dir;
} else if ('Bbc' == elfra) {
	logger.info('ValidateTabScreen generating issue') 
	dir.addError('this is a test error', node, attr);
	return dir;
	
}
ui.showAlert('WARNING', 'A','B')
return true

}