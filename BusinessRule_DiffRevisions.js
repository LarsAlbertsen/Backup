/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "DiffRevisions",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "DiffRevisions",
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
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {

var manager = node.getManager()
var revHomne = manager.getHome(com.stibo.core.domain.impl.unstable.revisionchange.RevisionChangeHomeImpl)

var revisions = node.getRevisions();
revisions.forEach(function(/**@type{Revision} */r) {
    var partObjects = revHomne.getRevisionChanges(r.getNode()).toArray();
    logger.info(r.getName()+' partObjects ChangeCount='+partObjects.length);

    partObjects.forEach(function(/**@type{PartObject} */part) {
        logger.info('\t'+part)
    });

});

}