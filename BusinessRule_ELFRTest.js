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
var doc = <ROOT/>;


var lh = manager.getHome(com.stibo.lookuptable.domain.LookupTableHome)
var startTime = java.lang.System.currentTimeMillis()
for (var i = 0; i<1000; i++) {
	manager.getHome(com.stibo.lookuptable.domain.LookupTableHome).getLookupTableValue('TestLookupTable', ''+i)
}
logger.info(java.lang.System.currentTimeMillis() - startTime)


}