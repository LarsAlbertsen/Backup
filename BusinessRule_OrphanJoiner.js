/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "OrphanJoiner",
  "type" : "BusinessAction",
  "setupGroups" : [ "OrphanTest" ],
  "name" : "OrphanJoiner",
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
    "contract" : "OutboundBusinessProcessorJoinerResultBindContract",
    "alias" : "result",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorJoinerSourceBindContract",
    "alias" : "source",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,result,source) {
result.appendToMessage('[')
var sss = 0;
var cnt = 0;
var isFirst = true;
while(source.hasNext()) {
	var msg = source.getNextMessage();
	if (msg && msg.length() > 0) {
		cnt++
		sss = sss + msg.length();
		if (!isFirst) {
			result.appendToMessage('\n' + ',')
		}
		result.appendToMessage(msg)
		isFirst = false;		
	}
}
result.appendToMessage(']')
logger.info(cnt + '  ' + sss)

}