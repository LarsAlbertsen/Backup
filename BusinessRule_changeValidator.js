/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "changeValidator",
  "type" : "BusinessAction",
  "setupGroups" : [ "API Additions" ],
  "name" : "changeValidator",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager) {

var myAttr = manager.getAttributeHome().getAttributeByID('newAttr666');

myAttr.setValidator("text", "","","",400)
logger.info("1 "+myAttr.getValidatorName())

myAttr.setValidator("numeric_text", "","","",400)
logger.info("1 "+myAttr.getValidatorName())

/*


var attr = manager.getAttributeHome().getAttributeByID("newAttr666");

logger.info("Current Validator name: " + attr.getValidatorName());

// attr.setValidator("numeric_text", String minValue, String maxValue, String mask, int maxLength);

attr.setValidator("numeric_text", "","", "", 400);

logger.info("New Validator name: " + attr.getValidatorName());


// numeric_text
// text
*/
}