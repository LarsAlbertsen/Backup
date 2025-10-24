/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AI.ImageAnalysis.AnalyzeImage",
  "type" : "BusinessAction",
  "setupGroups" : [ "AI.ImageAnalysis.BA" ],
  "name" : "(AI) Analyze Image",
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
    "alias" : "computerVisionEndpoint",
    "parameterClass" : "com.stibo.core.domain.impl.integrationendpoint.gateway.FrontGatewayIntegrationEndpointImpl",
    "value" : "AI.ImageAnalysis.GatewayEndpoint",
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
    "alias" : "tagsAttribute",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "captionAttribute",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "denseCaptionsAttribute",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "detectedTextAttribute",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (aiService,computerVisionEndpoint,currentObject,logger,manager,tagsAttribute,captionAttribute,denseCaptionsAttribute,detectedTextAttribute) {
// Analyze Image Action version 1.0 AI Image Analysis.
// NOTE: A bind must be made to the relevant gateway integration endpoint and attributes to produce the relevant tags, caption, description, and detected text.
// The produced values will be stored in their matching attributes. For example, detected text will be stored within the attribute with the bind that has the "detectedTextAttribute" variable name .

// Convenience function for replacing all values in a multi-valued attribute
function setMultiValue(asset, attribute, features, threshold) {
    var value = asset.getValue(attribute.getID());
    if (features == null) {
        value.deleteCurrent();
    } else {
        var valueBuilder = value.replace();
        for (var i = 0; i < features.size(); i++) {
            var feature = features.get(i);
            if (feature.getScore() > threshold) {
                valueBuilder.addValue(feature.getContent());
            } else {
                logger.info("Ignoring feature \"" + feature.getContent() + "\" with score " + feature.getScore());
            }
        }
        valueBuilder.apply();
    }
};

// Convenience function for setting a value for single-valued attribute
function setSingleValue(asset, attribute, features) {
    var value = asset.getValue(attribute.getID());
    if (features == null || features.size() == 0) {
        value.deleteCurrent();
    } else {
        value.setSimpleValue(features.get(0).getContent());
    }
};

var result = aiService.buildAnalyzeImageRequest(computerVisionEndpoint, currentObject)
    .withTags()
    .withCaptions()
    .withDenseCaptions()
    .withDetectedText()
    .execute();

// You may configure the caption attribute to be a single-valued attribute in this example.
setSingleValue(currentObject, captionAttribute, result.getCaptions());

// Each of these attributes is a multi-valued attribute so each result that exceeds the score threshold
// will be stored in the attribute value.
setMultiValue(currentObject, tagsAttribute, result.getTags(), 70);
setMultiValue(currentObject, denseCaptionsAttribute, result.getDenseCaptions(), 70);
setMultiValue(currentObject, detectedTextAttribute, result.getDetectedText(), 20);

logger.info(result);

}