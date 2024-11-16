/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LongRunning",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LongRunning",
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

function sleep(ms) {
    java.lang.Thread.currentThread().sleep(ms);
}

function main() {
	for (var min=0; min<20; min++) {
        for (var i=0; i<60; i++) {
            logger.info('Sleeping ' + min+'/'+i + ' seconds...');
            logger.info(manager.getProductHome().getTopProduct().getName())
            sleep(1000)
        }
    }    
}

main();
}