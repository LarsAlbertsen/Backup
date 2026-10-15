/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRAgentCall",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRAgentCall",
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
    "contract" : "AIAgentBindContract",
    "alias" : "agent",
    "parameterClass" : "com.stibo.ai.engine.runtime.domain.agent.Agent",
    "value" : "8a1bf94c-6e00-4fec-98b6-8eddeb75d595",
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AIAgentBindContract",
    "alias" : "updaterAgent",
    "parameterClass" : "com.stibo.ai.engine.runtime.domain.agent.Agent",
    "value" : "bb582aa9-0077-4066-a6c2-04aa3b857dd4",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,agent,logger,updaterAgent) {

var attrs =['18a2f6bd-81b5-4c8e-9cff-15ca6824eb5a', 'Bullet01', 'Bullet02', 'Bullet03', 
'Bullet04', 'Bullet05', 'Bullet06', 'Bullet07', 'Bullet08', 'Bullet09', 'Bullet10','Bullet11', 'Bullet12'];


updaterAgent.run(JSON.stringify({"ID":node.getID(), "ContextID":"Context1", "AttributeID":attrs}))
}