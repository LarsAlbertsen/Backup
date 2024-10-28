/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "TestForceDelete",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "TestForceDelete",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Leaf" ],
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
    "alias" : "parentNode",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "itemType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Item",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (parentNode,itemType) {


var newProduct = parentNode.createProduct('', itemType)

newProduct.startWorkflowByID('CreateItem', 'Starting WF')

newProduct.forceDelete()

}