/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRTest",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Operator user-type root" ],
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "hov",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>hasOrphanValues</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,manager,hov) {
var val = node.getValue('Bullet07')
val.setSimpleValue(val.getSimpleValue() + '7')
val = node.getValue('Bullet08')
val.setSimpleValue(val.getSimpleValue() + '8')
val = node.getValue('Bullet09')
val.setSimpleValue(val.getSimpleValue() + '9')























/*var user = manager.getUserHome().getUserByID('ELFR')

user.getValues().toArray().forEach(function(v) {
	logger.info(v.getAttribute().getID() + ' ' + v.getSimpleValue())	
})

var method = user.getClass().getMethod('getLog')
var res = method.invoke(user)
logger.info(res)
*/

function checkNode(n) {
	var orphans = {}
	n.getValues().toArray().forEach(v => {
		if (v.isLocal()) {
			if (v.isOrphan()) {
				var a = v.getAttribute().getID() + ''
				orphans[a] = v.getSimpleValue()
			}
		}
	})
	return orphans
}

//var nc = manager.getNodeCollectionHome().getNodeCollectionByID('32159714')//
//var x = checkNode(node)
//logger.info(x)
//logger.info(Object.keys(x).length)

//logger.info(hov.evaluate({root:node}))
/*
var a = manager.getAttributeHome().getAttributeByID('Bullet01')
logger.info(a.getValidatorName())
logger.info(a.getValidatorMaximumLength())
logger.info(a.getValidatorMaximumValue())
*/
}