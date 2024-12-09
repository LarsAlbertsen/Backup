/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "parseInt",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "parseInt",
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
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function () {


log.info('062100 : ' + parseInt('062100'))
log.info('062100 : ' + parseInt('062100',10))

var s = '062100'
var i = parseInt(s) + 1

logger.info('i='+i);

}