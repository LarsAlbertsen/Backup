/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CreatePublications",
  "type" : "BusinessAction",
  "setupGroups" : [ "API Additions" ],
  "name" : "Create Publications",
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
/** @type{PublicationHome} */
const pubHome = manager.getHome(com.stibo.core.domain.publishing.PublicationHome)
logger.info('1')
pubHome.getPublicationByID('12193281767424670212');
logger.info('2')
const pubGroup = pubHome.getPublicationGroupByID('100002')
logger.info('pubGroup=' + pubGroup);
if (pubGroup) {
    logger.info('3')
    const pubType = manager.getObjectTypeHome().getObjectTypeByID('Default publication type');
    logger.info('pubType=' + pubType);
    const myPublication = pubGroup.createPublication(java.util.UUID.randomUUID().toString(), pubType);
    logger.info('4 '+myPublication)

    myPublication.setName('My Publication');
    const sectionUUID = java.util.UUID.randomUUID().toString();
    const mySection = myPublication.createSection(sectionUUID, 'My Section');
    
    mySection.setName('My Section');
    
	
    
}

}