/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRWebUICondition2",
  "type" : "BusinessCondition",
  "setupGroups" : [ "ELFRConditions" ],
  "name" : "ELFRWebUICondition2",
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
  }, {
    "contract" : "HiddenContextBind",
    "alias" : "hidden",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "elfrb",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ELFRB",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,elfra,hidden,elfrb) {
function log(msg) {
	logger.info('ELFRWebUICondition2: ' + msg)
}

log(node + ' ' + elfra + ' ' + elfrb)



if ('hide' == elfra && 'hide' == elfrb) {
	hidden.setHidden(node, node.getManager().getAttributeHome().getAttributeByID('MarketingDescription1'))
	hidden.setHidden(node, node.getManager().getAttributeHome().getAttributeByID('MarketingDescription2'))
} 
return true

}