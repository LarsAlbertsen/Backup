/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateAttribute",
  "type" : "BusinessAction",
  "setupGroups" : [ "API Additions" ],
  "name" : "Create Attribute",
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

var ag = manager.getAttributeGroupHome().getAttributeGroupByID('_LAAL Attributes')




var itemType = manager.getObjectTypeHome().getObjectTypeByID('Item')
var familyType = manager.getObjectTypeHome().getObjectTypeByID('Family')

/** @type {StandardValidatorHome}   */
var validatorHome = manager.getHome(com.stibo.core.domain.validator.standard.StandardValidatorHome);
var unit = manager.getUnitHome().getUnitByID("unece.unit.CEL");

var textValidator = validatorHome.createTextValidator()
    .mask("aaaa")
    .maxLengthInBytes(100)
    .create();

var myValidator = validatorHome.createTextValidator()
    .create();

const attrBuilder = manager.getAttributeHome().createAttribute(ag)


var newAttr = attrBuilder
    .id('newAttr666')
    .name('my new attr66')
    .addValidObjectType(itemType)
    .withValidator(myValidator)
    .create()

    /*
    .addValidObjectType(familyType)
    .specification()
    .externallyMaintained()
    .withValidator(textValidator)
    */
}