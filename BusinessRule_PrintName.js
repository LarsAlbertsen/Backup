/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "PrintName",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "PrintName",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Family", "Item" ],
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
//logger.info("printName on "+node.getTitle());

//node.getClassificationProductLinks()

if (node.getName()==null) {
	throw "NULL name on "+node.getID();
}

const sysName = node.getManager().getSystemInformation().getSystemName()
logger.info("System Name: "+sysName+ "  Node Name: "+node.getName())


/*node.queryChildren().forEach((child) => {
	logger.info("Processing child: " + child.getTitle());
	return true
})*/



}