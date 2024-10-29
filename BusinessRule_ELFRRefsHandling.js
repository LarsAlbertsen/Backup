/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRRefsHandling",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "ELFRRefsHandling",
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
    "contract" : "ReferenceTypeBindContract",
    "alias" : "rt",
    "parameterClass" : "com.stibo.core.domain.impl.ReferenceTypeImpl",
    "value" : "ItemToItem",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,rt) {
var cnt = 0
var children = node.getChildren().toArray()
logger.info(children.length)
children.every(function(child) {
	child.delete()
	return cnt++ < 11164	
})
logger.info(children.length)

/*
var refs = node.getReferences(rt).toArray()
logger.info(refs.length)
refs.every(function(ref) {
	ref.delete()
	return cnt++ < 10200
})
*/
//logger.info(node.getReferences(rt).toArray().length)
/*
node.queryReferences(rt).forEach(function(ref) {
	//logger.info(ref)
	return cnt++ < 10
})
*/

}