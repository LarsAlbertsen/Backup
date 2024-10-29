/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRDeleteRecursive",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "ELFRDeleteRecursive",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item", "Level4" ],
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
function log(msg) {
	logger.info('ELFRDeleteRecursive: ' + msg)
}

function handleNode(n) {
	n.queryChildren().forEach(function(c) {
		handleNode(c)
		return true;	
	})
	log('delete ' + n.getObjectType().getID() + ' : ' + n.getID())
	n.delete()
}


handleNode(node)
}