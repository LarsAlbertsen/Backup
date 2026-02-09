/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRFalse",
  "type" : "BusinessCondition",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRFalse",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function () {
return "this is false"
}