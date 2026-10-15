/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRLog",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRLog",
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "fn",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>hasOrphanValues</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "SecretBindContract",
    "alias" : "secret",
    "parameterClass" : "com.stibo.passwordparameter.PasswordParameter",
    "value" : "eRAjNzxQJ81jAUVjF4v9QKYh6xLvP9orVbX4DWDI+7s=",
    "description" : null
  }, {
    "contract" : "AIAgentBindContract",
    "alias" : "agent",
    "parameterClass" : "com.stibo.ai.engine.runtime.domain.agent.Agent",
    "value" : "6a445042-b2a1-4cca-bb1d-bb11ba7866f8",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,fn,secret,agent) {
function log(msg) {
	logger.info('ELFRLog : ' + msg)
}


for (var x=0; x<10; x++) {
	log('A ' + x + ' ' + Date.now())

}

logger.info(agent.run("Eli")


//fn.evaluate({root:node})

//logger.info(secret)

}