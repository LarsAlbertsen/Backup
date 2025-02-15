/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "RS_Lib_Test",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "RS_Lib_Test",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ {
    "libraryId" : "RS_Lib",
    "libraryAlias" : "lib"
  } ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (lib) {

const classes = lib.getClassEnum()

logger.info("Classes: "+classes)

Object.keys(classes).forEach(function(key) {
	var value = classes[key]
	logger.info(key + " -> " + value)
	var javaClass = lib.getJavaClassByName(value)
	logger.info("JavaClasses "+javaClass)
})


}