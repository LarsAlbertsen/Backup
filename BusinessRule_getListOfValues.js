/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "getListOfValues",
  "type" : "BusinessAction",
  "setupGroups" : [ "API Additions" ],
  "name" : "getListOfValues",
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

let count = 0;

const home = manager.getListOfValuesHome();
const topGroup = home.getTopListOfValuesGroup();

printAll(topGroup);
logger.info("Count "+count);

function printAll(group) {
    logger.info(`Group: ${group.getName()}`);
    group.getListOfValues().forEach(value => {
        logger.info(`  Value: ${value.getName()} (${value.getID()})`);
        count++
    });
    group.getChildGroups().forEach(subGroup => {
        printAll(subGroup);
    });
}

}