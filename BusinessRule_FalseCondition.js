/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "FalseCondition",
  "type" : "BusinessCondition",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "FalseCondition",
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
	logger.info('FalseCondition: ' + t) 
}

log('Node='+node)
log('Node.elfra='+node.getValue('ELFRA').getSimpleValue())
log('elfra='+elfra)
//log('uiContext='+uiContext)

return 'You cannot pass, flame of Udun';	

}