/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ExecPythonAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "Extensions" ],
  "name" : "ExecPythonAction",
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
    "alias" : "func",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>ExecPythonFunction</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (func) {
const numberOfCalls = 10;

const param = new java.util.HashMap();
param.put("first", new java.lang.Integer(1))
param.put("second", new java.lang.Integer(2))

const begin = Date.now();
let totalSum = 0
for (let i = 0; i < numberOfCalls; i++) {
    const sum = func.evaluate(param);
    totalSum += sum;
}
const end = Date.now();
const duration = end - begin;
logger.info("Duration for "+numberOfCalls+" calls: "+duration+" ms");
logger.info("Average duration per call: "+(duration/numberOfCalls)+" ms");

}