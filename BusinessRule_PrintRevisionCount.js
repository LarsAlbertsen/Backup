/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "PrintRevisionCount",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "PrintRevisionCount",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Family", "Item", "Variant" ],
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

var approvedCount = node.getManager().executeInWorkspace("Approved", function(/** @type{Manager} */ approvedManager) {
    var approvedNode = approvedManager.getObjectFromOtherManager(node)
    if (approvedNode!=null) {
	    return approvedNode.getRevisions().size();
    }
    else {
    	return 0
    }
});

const DELIM = "\t"

if (approvedCount>0) {
	var revisions = node.getRevisions()
	var objectTypeID = node.getObjectType().getID();
	logger.info(DELIM+objectTypeID+DELIM+getPath(node)+DELIM+revisions.size() + DELIM+ approvedCount + DELIM + node.getID()+DELIM+node.getName());
}


function getPath(n) {
    if (n==null) return "";
    var path = "";
    while (n != null) {
        path = "/" + n.getName() + path;
        n = n.getParent();
    }
    return path;
}
}