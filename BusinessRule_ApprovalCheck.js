/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ApprovalCheck",
  "type" : "BusinessAction",
  "setupGroups" : [ "ApprovalActions" ],
  "name" : "ApprovalCheck",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "item",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (item) {

logger.info('Appprove '+item.getID())

item.getNonApprovedObjects().forEach(function(/** @type{PartObject} */obj) {
    logger.info('UnApproved + '+obj.getClass().getSimpleName())

    var er = item.getEditRevision(obj)
    logger.info('User '+er.getUserID())
});


}