/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRDCTEst",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRDCTEst",
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,node,manager) {
function log(msg) {
	logger.info(msg)
}




var dcs = node.getDataContainerByTypeID('ELFRContainer')
var singleDC = dcs.addDataContainer()
var kh = manager.getHome(com.stibo.core.domain.datacontainerkey.keyhome.DataContainerKeyHome)
var keyBuilder = kh.getDataContainerKeyBuilder('ELFRContainer')
var key = keyBuilder.withAttributeValue('DCKey', 'asdfasfsafafsda').build()
var dco = singleDC.createDataContainerObjectWithKey(key)
}