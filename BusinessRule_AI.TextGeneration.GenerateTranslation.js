/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AI.TextGeneration.GenerateTranslation",
  "type" : "BusinessAction",
  "setupGroups" : [ "AI.TextGeneration.BA" ],
  "name" : "(AI) Generate Translation",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
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
    "contract" : "AIServiceHomeBindContract",
    "alias" : "aiService",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "GatewayBinding",
    "alias" : "openAIEndpoint",
    "parameterClass" : "com.stibo.core.domain.impl.integrationendpoint.gateway.FrontGatewayIntegrationEndpointImpl",
    "value" : "AI.TextGeneration.GatewayEndpoint",
    "description" : null
  }, {
    "contract" : "CurrentObjectBindContract",
    "alias" : "currentObject",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "aiDescription",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "description",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (aiService,openAIEndpoint,currentObject,logger,manager,aiDescription,description) {
// Generate Translation Action version 1.0 AI Text Generation.
// NOTE: A bind must be made to the relevant gateway integration endpoint and attributes for this to produce a translation.
// Translation will be stored in the attribute with the binding id "aiDescription".

function setValueInContext(contextID, value) {
   manager.executeInContext(contextID, function(contextManager) {
       return contextManager.getObjectFromOtherManager(currentObject).getValue(aiDescription.getID()).setSimpleValue(value);
   });
}

var systemInstruction = "You are an AI assistant that translates English to German.";

var generationRequest = currentObject.getValue(description.getID()).getSimpleValue();

if (generationRequest == null) {
   logger.info("Nothing to generate");
   return;
}

generationRequest = "Translate the following:\n" + generationRequest;

var result = aiService.buildTextGenerationRequest(openAIEndpoint).withSystemMessage(systemInstruction).withMessage(generationRequest).execute();

setValueInContext("DE All All", result);

logger.info(result);

}