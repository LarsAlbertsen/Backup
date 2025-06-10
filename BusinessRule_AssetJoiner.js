/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AssetJoiner",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "AssetJoiner",
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
exports.operation0 = function (joinerSource,joinerResult) {
// Joiner Source bound joinerSource
// Joiner Result bound to joinerResult



var msg = JSON.parse(joinerSource.getNextMessage("upsert"))
//logger.info("msg "+msg);
var contentString = new java.lang.String(msg.content)
//logger.info("contentString="+contentString)

logger.info("contentString length "+contentString.length())

var content = java.util.Base64.getDecoder().decode(contentString);
logger.info("got binary");
//logger.info("content "+contentString.length);

joinerResult.appendToMessage(content);
logger.info("Done")



/*


function appendFromGroup(messageGroup) {
  var seen = [];
  var first = true;
  while(joinerSource.hasNext(messageGroup)) {
    var messageString = joinerSource.getNextMessage(messageGroup);
    var hash = messageString.hashCode();
    if (seen.indexOf(hash) == -1) {
      seen.push(hash);
      if (first) {
        first = false;
      } else {
        joinerResult.appendToMessage(",");
      }
      joinerResult.appendToMessage(messageString);
    }
  }
}


logger.info("joinerResult "+joinerResult);
joinerResult.appendToMessage("{\"products\":{\"upsert\":[");
appendFromGroup("upsert");
joinerResult.appendToMessage("],\"delete\":[");
appendFromGroup("delete");
joinerResult.appendToMessage("]}}");*/
}