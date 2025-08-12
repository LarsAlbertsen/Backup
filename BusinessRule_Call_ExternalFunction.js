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
    "alias" : "convertFromExcel",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>ConvertFromExcel</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "TempStoreBindContract",
    "alias" : "tmpStore",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AssetBindContract",
    "alias" : "excelAsset",
    "parameterClass" : "com.stibo.core.domain.impl.FrontAssetImpl$$Generated$$25",
    "value" : "32158417",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "convertToExcel",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>ConvertToExcel</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (convertFromExcel,tmpStore,excelAsset,convertToExcel) {

{
    /**
     * Convert CSV to Excel
     */
    const value =
        `header1|header2|header3
a1|a2|a3
b1|b2|b3
c1|c2|c3
d1|d2|d3
e1|e2|e3`
        ;

    const csvFile = tmpStore.create("file.tmp");
    csvFile.write(value);
    csvFile.close();

    let args1 = new java.util.HashMap();
    args1.put("csvFile", csvFile);
    const result1 = convertToExcel.evaluate(args1);

    var resultStream = result1.inputStream();
    var resultData = resultStream.readAllBytes();
    logger.info("Excel File: " + resultData);

    /**
     * Convert Excel to JSON
     */

    /** {Payload} */
    const myFile = tmpStore.create("file.tmp");
    myFile.outputStream().write(resultData);
    myFile.close();
    resultStream.close();

    let args = new java.util.HashMap();
    args.put("excelFile", myFile);

    var returnValue = convertFromExcel.evaluate(args);
    /** @type{Payload) */
    const jsonPayload = convertFromExcel.evaluate(args);
    var bytes = jsonPayload.inputStream().readAllBytes();
    logger.info(new java.lang.String(bytes));

}

}