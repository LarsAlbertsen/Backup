/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRWebUIRuleA",
  "type" : "BusinessAction",
  "setupGroups" : [ "WebUI" ],
  "name" : "ELFRWebUIRuleA",
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
    "contract" : "DataIssuesContextBind",
    "alias" : "dir",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
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
exports.operation0 = function (dir,node) {
dir.addError("AAAAAAAAAAAAAAA");
dir.addError("222222222222222", node, node.getManager().getAttributeHome().getAttributeByID('Bullet01'));
dir.addError("222222222222222", node, node.getManager().getAttributeHome().getAttributeByID('Bullet03'));
dir.addWarning("33333333", node, node.getManager().getAttributeHome().getAttributeByID('Bullet02'));
return dir;
}
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
    "contract" : "DataIssuesContextBind",
    "alias" : "dir",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation1 = function (node,dir) {
dir.addError("4444444", node, node.getManager().getAttributeHome().getAttributeByID('Bullet04'));
return dir
}