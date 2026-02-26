/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Test",
  "type" : "BusinessAction",
  "setupGroups" : [ "Extensions" ],
  "name" : "Test",
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
    "alias" : "myFunc",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>myFunc</BusinessFunction>\n</BusinessFunctionReference>\n",
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
exports.operation0 = function (myFunc,tmpStore) {

const value =
        `header1|header2|header3
a1|a2|a3
b1|b2|b3
c1|c2|c3
d1|d2|d3
e1|e2|e3`;

const csvFile = tmpStore.create("file.tmp");
csvFile.write(value);
csvFile.close();

let args1 = new java.util.HashMap();
args1.put("csvFile", csvFile);
const assetID = myFunc.evaluate(args1);


}