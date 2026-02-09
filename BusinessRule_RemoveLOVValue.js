/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "RemoveLOVValue",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "RemoveLOVValue",
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
    "contract" : "ListOfValuesBindContract",
    "alias" : "MyLOV",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "Color2",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (MyLOV) {

logger.info("Starting script: RemoveLOVValue1523470528510076101.js");
const lovValue = MyLOV.getListOfValuesValueByID("32053918");

logger.info("LOV Value "+lovValue);

lovValue.delete();
logger.info("Deleted LOV Value");


}