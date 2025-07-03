/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CreatePublication",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "Create Publication",
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
/** @type{PublicationHome} */
const pubHome = manager.getHome(com.stibo.core.domain.publishing.PublicationHome)
pubHome.getPublicationByID('12193281767424670212');
const pubGroup = pubHome.getPublicationGroupByID('100002')
logger.info('pubGroup='+pubGroup);
if (pubGroup) {
    const pubType = manager.getObjectTypeHome().getObjectTypeByID('Publication');
    logger.info('pubType='+pubType);
    pubGroup.createPublication('myPub', pubType);
}

}