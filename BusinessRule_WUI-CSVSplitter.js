/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "WUI-CSVSplitter",
  "type" : "BusinessAction",
  "setupGroups" : [ "WebUI-IEPs" ],
  "name" : "WUI-CSVSplitter",
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
function log(msg) {
	logger.info('WUI-CSVSplitter: ' + msg)
	elogger.logInfo(msg)
}

//var data = '<ID>;ELFRB;ELFR A\n40016617;ACxxx;hide'
var data = '' + source.getContentAsString()
log(data)
var arr = data.split(/\n/);
var lineNo = 0;
var headers;
arr.forEach(function(line) {
	
	if (lineNo == 0) {
		headers = line.split(/;/);
	} else {
		var cols = line.split(/;/);
		var ix = 0;
		var json = {}
		headers.forEach(function(col) {
			json[col] = cols[ix++]
		})
		log(JSON.stringify(json))
		result.addMessage(JSON.stringify(json))
	}
	lineNo++;
})

}