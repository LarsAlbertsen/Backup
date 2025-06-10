/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AssetHandler",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "AssetHandler",
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
    "contract" : "OutboundBusinessProcessorNodeHandlerSourceBindContract",
    "alias" : "nodeHandlerSource",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorNodeHandlerResultBindContract",
    "alias" : "nodeHandlerResult",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorExecutionReportLoggerBindContract",
    "alias" : "executionReportLogger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (nodeHandlerSource,nodeHandlerResult,executionReportLogger) {
// Node Handler Source bound to nodeHandlerSource
// Node Handler Result bound to nodeHandlerResult
// ExecutionReportLogger bound to executionReportLogger

logger.info("AssetHandler")

var simpleEventType = nodeHandlerSource.getSimpleEventType();
if (simpleEventType == null) {
  executionReportLogger.logInfo("No event information available in node handler");
} else {
  executionReportLogger.logInfo("Event with ID '" + simpleEventType.getID()+ "' passed to node handler");
}
var node = nodeHandlerSource.getNode();
logger.info("AssetHandler node "+node)
if (node != null) {
  logger.info("Node handler handling product with URL: " + node.getURL());
  executionReportLogger.logInfo("Node handler handling product with URL: " + node.getURL());

  /** @type{Asset} */
  var asset = node;

  var file = new java.io.File("/tmp/" + asset.getID() + ".jpg");
  var outputStream = new java.io.FileOutputStream(file)
  
  var baos = new java.io.ByteArrayOutputStream();
  
  asset.download(baos);
  baos.close();

  var b64 = java.util.Base64.getEncoder().encodeToString(baos.toByteArray());
	logger.info("b64 length "+b64.length());

  var mesg = {};
  mesg.stepid = node.getID() + "";
  mesg.content = b64;
  mesg.name = node.getValue("UPC").getSimpleValue() + "";   // UPC
  
  if (nodeHandlerSource.isDeleted()) {
    nodeHandlerResult.addMessage("delete", JSON.stringify(mesg));	
  } else {
    //mesg.category = node.getParent() == null ? null : node.getParent().getTitle() + "";
    mesg.productName = node.getTitle();  // Product Name
    //mesg.manufacturerName = node.getValue("MFGName").getSimpleValue()+ ""; // MFG Name Name
    nodeHandlerResult.addMessage("upsert", JSON.stringify(mesg));	
  }
}
}