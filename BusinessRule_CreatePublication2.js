/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CreatePublication2",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "CreatePublication2",
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
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "pubType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Default publication type",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "sectionType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Section",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,pubType,sectionType) {

/** @type{PublicationHome} */
const pubHome = manager.getHome(com.stibo.core.domain.publishing.PublicationHome)
const pubGroup = pubHome.getPublicationGroupByID('Spring 2025')
const currentPublication = pubGroup.createPublication('3241', pubType);

var publicationGroup = currentPublication.getParent();
var publicationSection = currentPublication.createSection("Section1", sectionType);
var version = currentPublication.createVersion("English");

publicationSection.addNode(manager.getProductHome().getProductByID('123'))
publicationSection.addNode(manager.getProductHome().getProductByID('124'))



}