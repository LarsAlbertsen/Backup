/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CheckDC_Validity",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "CheckDC_Validity",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager) {


var h = manager.getHome(com.stibo.lookuptable.domain.LookupTableHome);
logger.info("h="+h)

/** @type{DataContainerTypeHome} */
var dcTypeHome = manager.getHome(com.stibo.core.domain.datacontainertype.DataContainerTypeHome)
logger.info("Home "+dcTypeHome)

var myType = dcTypeHome.getDataContainerTypeByID("MyDataContainerType")
logger.info("myType="+myType)
var type = myType.getValidForTypes();
logger.info("validTypes = "+ type)


//var dcType = manager.getAttributeHome()
}