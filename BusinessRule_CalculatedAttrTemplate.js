/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CalculatedAttrTemplate",
  "type" : "BusinessAction",
  "setupGroups" : [ "WhiteListTest" ],
  "name" : "CalculatedAttrTemplate",
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
    "contract" : "AttributeBindContract",
    "alias" : "attr",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "CalculatedAttr",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (attr) {


attr.setDerived(true);
attr.setDerivedAttributeValueTemplate("<derive expr=\"concatenate(value('a1'),value('a2'),value('a3'))\"/>");

const template1 = attr.getDerivedAttributeValueTemplate();
logger.info("template "+template1);

}