/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ApproveRecursive",
  "type" : "BusinessAction",
  "setupGroups" : [ "AutoRules" ],
  "name" : "ApproveRecursive",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
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
exports.operation0 = function (node,logger) {


const visited = {};

function isCompletelyApproved(n) {
    return n.getApprovalStatus().equals(
        com.stibo.core.domain.workspaceaware.ApprovalStatus.CompletelyApproved
    );
}

// Walks up the parent chain and approves top-down (grandparent first) so
// STEP never encounters a situation where a child is approved before its parent.
function approveParentChain(n) {
    const parent = n.getParent();
    if (parent === null) {
        return;
    }
    approveParentChain(parent);
    if (parent.getObjectType().isProductType() && !isCompletelyApproved(parent)) {
        logger.info("Approving parent: " + parent.getID());
        parent.approve();
    }
}

// Approves the given product node together with its referenced products,
// and ensures each node's parent chain is approved first.
// Uses a visited map to prevent infinite loops from circular references.
function approveWithReferences(n) {
    const id = n.getID() + "";
    if (visited[id]) {
        return;
    }
    visited[id] = true;

    if (!n.getObjectType().isProductType()) {
        return;
    }

    // Approve the full parent chain first (top-down) before this node
    approveParentChain(n);

    // Recurse into all referenced product targets
    n.queryReferences(null).forEach(function (reference) {
        const target = reference.getTarget();
        if (target !== null && target.getObjectType().isProductType()) {
            approveWithReferences(target);
        }
        return true;
    });

    // Approve this node after its parents and referenced nodes are approved
    if (!isCompletelyApproved(n)) {
        logger.info("Approving node: " + n.getID());
        n.approve();
    }
}

approveWithReferences(node);

}