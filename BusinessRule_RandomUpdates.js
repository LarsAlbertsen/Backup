/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "RandomUpdates",
  "type" : "BusinessAction",
  "setupGroups" : [ "ApproveActions" ],
  "name" : "RandomUpdates",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
function upd(attrid) {
    var v = node.getValue(attrid);
    var randomInt = Math.floor(Math.random() * 100) + 1;
    node.setSimpleValue(v.getAttribute(), randomInt);
}

upd('Number')
upd('NumericText')
node.approve();
}