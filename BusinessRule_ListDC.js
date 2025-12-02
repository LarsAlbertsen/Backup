/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ListDC",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "ListDC",
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
    "alias" : "item",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (item) {

item.getDataContainers().forEach(function(arg) {
    /* @type{DataContainer} */
    var dataContainer = arg;
    
    logger.info("Data Container: " + dataContainer.getDataContainerType() + " isOrphan "+dataContainer.isOrphan());  
});


}