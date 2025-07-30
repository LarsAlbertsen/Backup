/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LogAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "AMF Actions" ],
  "name" : "LogAction",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item", "TestItem" ],
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
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
    "contract" : "ApproveContextBindContract",
    "alias" : "ac",
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
    "contract" : "AuditMessageTopicBindContract",
    "alias" : "logTopic",
    "parameterClass" : "com.stibo.auditmessaging.domain.impl.topic.AuditMessageTopicImpl",
    "value" : "LogTopic",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,ac,manager,logTopic) {

var myMsg = {
	time: new Date(Date.now()).toISOString(),
	user: node.getManager().getCurrentUser().getID(),
	id: node.getID(),
	name: node.getName(),
	message: 'Hello World'	
}


logger.info(JSON.stringify(myMsg))
logTopic.sendMessageAsync(JSON.stringify(myMsg))
logger.info("Done sending to Kafka");

}