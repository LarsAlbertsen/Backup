/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "PrintRevisionChanges",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "PrintRevisionChanges",
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
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,logger) {



//var x = com.stibo.core.domain.impl.unstable.revisionchange.RevisionChangeHome;

var x = com.stibo.core.domain.unstable.revisionchange.RevisionChangeHome;
//var x = com.stibo.lookuptable.domain.LookupTableHome
var h = manager.getHome(x);
logger.info("h="+h)




var allRevisions = node.getRevisions();
allRevisions.reversed().forEach(function(/** @type {Revision} */ revision) {
    logger.info(revision.getCreatedDate()+" name="+revision.getName());
    const partObjects = h.getRevisionChanges(revision.getNode());
    partObjects.forEach(function(/** @type {PartObject} */ partObject) {
        if (partObject instanceof com.stibo.core.domain.partobject.ValuePartObject) {
            logger.info("  Value: "+partObject);
        }
        else if (partObject instanceof com.stibo.core.domain.partobject.ClassificationLinkPartObject) {
            logger.info("  ClassificationLink: "+partObject);
        }
        else if (partObject instanceof com.stibo.core.domain.partobject.NamePartObject) {
            logger.info("  NamePartObject: "+partObject);
        }
        else {
            logger.info("  unknown partObject="+partObject);
        }
    });
});
}