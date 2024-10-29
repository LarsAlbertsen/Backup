/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRRevisionList",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "ELFRRevisionList",
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
  }, {
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
exports.operation0 = function (node,logger,manager) {
var approvedRevision = manager.executeInWorkspace('Approved', function(am) {
	var approvedNode = am.getObjectFromOtherManager(node)
	if (approvedNode) {
		return approvedNode.getRevision();
	}
	return null;
})


function valueDiffer(n,aid) {
	var mv = n.getValue(aid).getSimpleValue();
	var av = manager.executeInWorkspace('Approved', function(am) {
		var approvedNode = am.getObjectFromOtherManager(node)
		return approvedNode.getValue(aid).getSimpleValue()
	})	
	return mv != av;
}


function analyzeValuePart(po) {
	logger.info(po.getAttributeID());
	var changeUser;
	node.getRevisions().toArray().forEach(function(rev) {
		if (rev.getCreatedDate().after(approvedRevision.getCreatedDate())) {
			if (valueDiffer(node, po.getAttributeID())) {
				changeUser = rev.getUserID()
			}
		}
	})
	logger.info(changeUser)
}

node.getNonApprovedObjects().toArray().forEach(function(po){
		logger.info(po)
		if (po instanceof com.stibo.core.domain.partobject.ValuePartObject) {
			analyzeValuePart(po)
		}
	}
);



}