/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AI.TextGeneration.GenerateProdDesc",
  "type" : "BusinessAction",
  "setupGroups" : [ "AI.TextGeneration.BA" ],
  "name" : "(AI) Generate Product Description",
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
    "alias" : "features",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "brandName",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "category",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (aiService,openAIEndpoint,currentObject,logger,manager,aiDescription,features,brandName,category) {
// Generate Product Description Action version 1.0 AI Text Generation.
// NOTE: A bind must be made to the relevant gateway integration endpoint and attributes for this to produce a product description.
// The product description will be stored in the attribute with the binding id "aiDescription".

var systemInstruction = "You are an AI assistant, responsible for creating product descriptions for an online clothing store." + 
   "Your descriptions should be captivating, and evoke a sense of exhilaration. " + 
   "Emphasize the quality of the materials, craftsmanship, and how the product can enhance the customer's enjoyment.";

var generationRequest = "Write a product description for a product with the following attributes:" + 
   "Product Name: " + currentObject.getTitle() + "\n"

var brandNameValue = currentObject.getValue(brandName.getID());
if (categoryValue != null && brandNameValue.getSimpleValue() != null) {
   generationRequest = generationRequest + 
       "Brand Name: " + brandNameValue.getSimpleValue() + "\n";
}

var categoryValue = currentObject.getValue(category.getID());
if (categoryValue != null && categoryValue.getSimpleValue() != null) {
   generationRequest = generationRequest + 
       "Category: " + categoryValue.getSimpleValue() + "\n";
}

var featureValues = currentObject.getValue(features.getID());
if (featureValues != null && featureValues.getSimpleValue() != null) {
   generationRequest = generationRequest + 
       "Features: " + featureValues.getSimpleValue().replaceAll("<multisep/>", ", ");
}

// Note, that by increasing the temperature, which is 0.5 by default, the model will produce more random and creative output.
var builder = aiService.buildTextGenerationRequest(openAIEndpoint)
    .withSystemMessage(systemInstruction)
    .withMessage(generationRequest)
    .withTemperature(0.8)

var result = builder.execute();

currentObject.getValue(aiDescription.getID()).setSimpleValue(result);

logger.info(result);

}