/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "InitiateConditionTest",
  "type" : "BusinessCondition",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "InitiateConditionTest",
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
    "contract" : "SimpleValueBindContract",
    "alias" : "elfra",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ELFRA",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,elfra) {
function log(t) {
	logger.info('InitiateConditionTest: ' + t) 
}

log('Node='+node)
log('elfra='+elfra)
//log('uiContext='+uiContext)

return 'You cannot pass, flame of Udun';	

}