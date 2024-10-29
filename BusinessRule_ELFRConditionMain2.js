/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRConditionMain2",
  "type" : "BusinessCondition",
  "setupGroups" : [ "ELFRConditions" ],
  "name" : "ELFRConditionMain2",
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
    "contract" : "BusinessConditionBindContract",
    "alias" : "ca",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessConditionImpl",
    "value" : "ELFRCondition-A",
    "description" : null
  }, {
    "contract" : "BusinessConditionBindContract",
    "alias" : "cb",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessConditionImpl",
    "value" : "ELFRCondition-B",
    "description" : null
  }, {
    "contract" : "BusinessConditionBindContract",
    "alias" : "cc",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.FrontBusinessConditionImpl",
    "value" : "ELFRCondition-C",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "A",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ELFRA",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "B",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ELFRALov",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (ca,cb,cc,node,A,B) {
var resa = ca.evaluate(node)
var resb = cb.evaluate(node)
var resc = cc.evaluate(node)

var res = ''
res += resa.isRejected() ? 'A' : '';
res += resb.isRejected() ? 'B' : '';
res += resc.isRejected() ? 'C' : '';

logger.info(A.getListOfValues().getDimensionDependencies().size())
logger.info(B.getListOfValues().getDimensionDependencies().size())

B.getListOfValues().getDimensionDependencies().toArray().forEach(function(d) {
	logger.info(d.getID())	
})

return res ? res : true
}