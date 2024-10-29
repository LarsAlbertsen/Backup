/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "BusinessActionOIEP-Joiner",
  "type" : "BusinessAction",
  "setupGroups" : [ "BusinessAction" ],
  "name" : "Joiner",
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
    "contract" : "OutboundBusinessProcessorJoinerSourceBindContract",
    "alias" : "joinerSource",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "OutboundBusinessProcessorJoinerResultBindContract",
    "alias" : "joinerResult",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,joinerSource,joinerResult) {
function log(msg) {
	logger.info('BusinessActionOIEP-Joiner: ' + msg)
}

//############################## Main ##############################

function appendFromGroup(messageGroup) {
  var first = true;
  while(joinerSource.hasNext(messageGroup)) {
    var messageString = joinerSource.getNextMessage(messageGroup);
    log(messageGroup + ' -> ' + messageString)
    joinerResult.appendToMessage(messageString + ',');
  }
}

log('HasNext ' + joinerSource.hasNext())

appendFromGroup("A");
//appendFromGroup("B");


}