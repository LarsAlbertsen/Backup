/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Sleep",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "Sleep",
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

const delay = Math.floor(Math.random() * 30000);
java.lang.Thread.currentThread().sleep(delay)
logger.info("Start "+delay)



let str = "";

let count = 0
const start = Date.now();
while (Date.now() - start < 20000) {
  count++;
  str += "xx";
}
logger.info("End "+count);

}