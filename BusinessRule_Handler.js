/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Handler",
  "type" : "BusinessAction",
  "setupGroups" : [ "BRIEPTest" ],
  "name" : "Handler",
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
    "contract" : "InboundBusinessProcessorImporterSourceBindContract",
    "alias" : "source",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (source,logger) {
var data = source.getMessage();

var json = JSON.parse(data)

if (json.sleeptime) {
	logger.info(data)
	java.lang.Thread.sleep(json.sleeptime)
	
} else {
	logger.info(data)
	logger.info('NO SLEEP')
}




}