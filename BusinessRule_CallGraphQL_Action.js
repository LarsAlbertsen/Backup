/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CallGraphQL_Action",
  "type" : "BusinessAction",
  "setupGroups" : [ "Extensions" ],
  "name" : "CallGraphQL_Action",
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
    "alias" : "callGraphQL",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>CallGraphQL</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (callGraphQL,logger) {

{

const param = new java.util.HashMap();
const q = `query workspaces {
  workspaces {
    id
    name
  }
}`;

param.put("query", q)

const begin = Date.now();
const result = callGraphQL.evaluate(param);
logger.info(result);

const end = Date.now();
logger.info("Duration: "+(end-begin)+" ms");

    
    
    
    
    
    
    const after1 = new Date().getTime();
    logger.info("callGraphQL Time: " + (after1 - begin) + " ms");

}

}