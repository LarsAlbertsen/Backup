/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "checkIntegrationEndpoints",
  "type" : "BusinessAction",
  "setupGroups" : [ "WhiteListTest" ],
  "name" : "checkIntegrationEndpoints",
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
exports.operation0 = function (manager) {

var endpoint = manager.getIntegrationEndpointHome().getIntegrationEndpointByID("MongoDB");
logger.info("Got endpoint "+endpoint)

endpoint.setEnabled(true);
endpoint.startEndpointImmediatly()


const config = endpoint.getDeliveryConfigurationAsXML()
logger.info("MasterConfig "+config)


var endpoint2 = manager.getIntegrationEndpointHome().getIntegrationEndpointByID("LarsTest1");
const oldConfig = endpoint2.getDeliveryConfigurationAsXML()
logger.info("oldConfig "+oldConfig)


endpoint2.setDeliveryConfigurationAsXML(config)

const newConfig = endpoint2.getDeliveryConfigurationAsXML()
logger.info("newConfig "+newConfig)








}