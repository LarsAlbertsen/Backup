/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRLovTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "ELFRLovTest",
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
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,logger) {
function log(msg) {
	logger.info('ELFRTermsList: ' + msg)
}

var lov = manager.getListOfValuesHome().getListOfValuesByID('ELFRLovWithID')
log(lov)
var val = lov.getListOfValuesValueByID('1')
log(val.getValue())

lov.queryValidValues().forEach(function(v) {
	log(v.getID() + '   ' + v.getValue())
	return true
})
}