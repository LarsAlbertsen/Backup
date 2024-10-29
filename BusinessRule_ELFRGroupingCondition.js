/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRGroupingCondition",
  "type" : "BusinessCondition",
  "setupGroups" : [ "ELFRConditions" ],
  "name" : "ELFRGroupingCondition",
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
    "contract" : "HiddenContextBind",
    "alias" : "hidden",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "group",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "GroupingAttribute2",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,hidden,group) {
function log(msg) {
	logger.info('ELFRGroupingCondition: ' + msg)
}

log('A')
log(node + ' ' + group)
log('B')


//if ('hide' == elfra && 'hide' == elfrb) {
//	hidden.setHidden(node, node.getManager().getAttributeHome().getAttributeByID('MarketingDescription1'))
//	hidden.setHidden(node, node.getManager().getAttributeHome().getAttributeByID('MarketingDescription2'))
//} 
return true

}