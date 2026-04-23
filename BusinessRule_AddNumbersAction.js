/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AddNumbersAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "Extensions" ],
  "name" : "AddNumbersAction",
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "add",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>AddNumbers</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (add) {
const numberOfCalls = 10;

const param = new java.util.HashMap();
param.put("first", new java.lang.Integer(1))
param.put("second", new java.lang.Integer(2))

const begin = Date.now();
let totalSum = 0
for (let i = 0; i < numberOfCalls; i++) {
    const sum = add.evaluate(param);
    totalSum += sum;
}
const end = Date.now();
const duration = end - begin;
logger.info("Duration for "+numberOfCalls+" calls: "+duration+" ms");
logger.info("Average duration per call: "+(duration/numberOfCalls)+" ms");

}