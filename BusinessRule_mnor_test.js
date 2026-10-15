/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "mnor_test",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "mnor_test",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
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
    "contract" : "EventQueueBinding",
    "alias" : "eq",
    "parameterClass" : "com.stibo.core.domain.impl.eventprocessor.EventProcessorImpl",
    "value" : "step://eventprocessor?id=PurgeRevisionsSingleProduct",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,logger,eq) {
var prod = manager.getProductHome().getProductByID("mnor-test");
if(prod != null) {
	logger.info(prod.getObjectType().getID());
}
else {
	logger.info("product not found on system");
	var parent = manager.getProductHome().getProductByID("Product hierarchy root");
	var p = parent.createProduct("mnor-test", "Product Folder");
	logger.info("product Recreated or revived: " + p.getID());
	
}



}