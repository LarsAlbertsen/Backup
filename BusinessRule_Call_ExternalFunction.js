/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Call_ExternalFunction",
  "type" : "BusinessAction",
  "setupGroups" : [ "Extensions" ],
  "name" : "Call_ExternalFunction",
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
    "alias" : "externalFunction",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>ConvertToExcel</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "TempStoreBindContract",
    "alias" : "tmpStore",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (externalFunction,tmpStore) {

const value = 
`header1|header2|header3
a1|a2|a3
b1|b2|b3
c1|c2|c3
d1|d2|d3
e1|e2|e3`
;

const myFile = tmpStore.create("file.tmp");
myFile.write(value);
myFile.close();

let args = new java.util.HashMap();
args.put("booleanParameter2", true);
args.put("stringParameter2", "Lars");
args.put("payload", myFile);
const result = externalFunction.evaluate(args);

logger.info("External function executed with arguments: " + JSON.stringify(result));
}