/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRLookupTableTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "ELFRLookupTableTest",
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
    "contract" : "LookupTableHomeBindContract",
    "alias" : "lth",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,lth,manager) {
logger.info('a -> ' + lth.getLookupTableValue('LookupTable', 'a'))
logger.info('b -> ' + lth.getLookupTableValue('LookupTable', 'b'))

manager.executeInWorkspace('Approved', function(m) {
	logger.info('Lookup in Approved WS')
	var l = m.getHome(com.stibo.lookuptable.domain.LookupTableHome)
	logger.info('a -> ' + l.getLookupTableValue('LookupTable', 'a'))
	logger.info('b -> ' + l.getLookupTableValue('LookupTable', 'b'))	
})

}