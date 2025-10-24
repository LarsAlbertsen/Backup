/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AI.TextGeneration.GenerateImageAltText",
  "type" : "BusinessAction",
  "setupGroups" : [ "AI.TextGeneration.BA" ],
  "name" : "(AI) Generate Image Alt Text",
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
    "alias" : "aiAltText",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (aiService,openAIEndpoint,currentObject,logger,manager,aiAltText) {
// Generate Alt-Text For Image version 1.0 AI Text Generation.
// NOTE: A bind must be made to the relevant gateway integration endpoint and attributes for this to produce alt-text.
// Text will be stored in the attribute with the binding id "aiAltText".

var role = "Act as a professional copywriter for an online store.";
var task = "You are responsible for analyzing images and creating alt-text suitable for describing the image on a shopping website.";
var format = "The response should focus on being descriptive for people with visual impairments, be less than 100 characters and start with a capital letter.";

var systemInstruction = role + task + format;

var generationRequest = "Generate alt-text for the image";

var result = aiService.buildTextGenerationRequest(openAIEndpoint)
   .withSystemMessage(systemInstruction)
   .withAssets(currentObject)
   .withMessage(generationRequest)
   .execute();

currentObject.getValue(aiAltText.getID()).setSimpleValue(result);

logger.info(result);
}