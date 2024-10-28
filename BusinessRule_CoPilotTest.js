/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CoPilotTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "CoPilot Test",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
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
    "alias" : "curItem",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (curItem) {



// Get unique list of values of Color attribute on product children
var uniqueColors = new Set();
var productChildren = curItem.getChildren().toArray();

for (var i = 0; i < productChildren.length; i++) {
  var colorValue = productChildren[i].getValue('Color').getSimpleValue();
  uniqueColors.add(colorValue);
}

var uniqueColorList = Array.from(uniqueColors);
uniqueColorList;
}