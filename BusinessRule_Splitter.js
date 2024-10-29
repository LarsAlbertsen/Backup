/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Splitter",
  "type" : "BusinessAction",
  "setupGroups" : [ "BusinessActionIIEP" ],
  "name" : "Splitter",
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "InboundBusinessProcessorSplitterSourceBindContract",
    "alias" : "source",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "InboundBusinessProcessorSplitterResultBindContract",
    "alias" : "result",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "InboundBusinessProcessorExecutionReportLoggerBindContract",
    "alias" : "elogger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,source,result,elogger) {


var data = source.getContentAsString();
var before = java.lang.System.currentTimeMillis();
elogger.logInfo('Splitter data length=' + data.length())
var doc = JSON.parse(data)
doc.data.forEach(function(l) {
	result.addMessage(l)
})
var after = java.lang.System.currentTimeMillis();
elogger.logInfo('Done with splitting ' + (after - before))
//result.addMessage(data)
}