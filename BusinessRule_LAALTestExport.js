/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LAALTestExport",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALExport" ],
  "name" : "LAALTestExport",
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
    "alias" : "LAALExportFunction",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>LAALExportFunction3</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "TempStoreBindContract",
    "alias" : "tmpStore",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "itemType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Item",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (LAALExportFunction,tmpStore,manager,itemType) {


const numberOfProducts = 10000;
const maxThreads = 4


var c = com.stibo.query.condition.Conditions;
var h = manager.getHome(com.stibo.query.home.QueryHome);
var querySpecification = h.queryFor(com.stibo.core.domain.Product).where(c.objectType(itemType));;
var query = querySpecification.execute();


var count = 0;
var l = new java.lang.StringBuilder()

query.forEach(function (node) {
  if (++count <= numberOfProducts) {
    l.append(node.getID() + "|");
    return true;
  }
  else {
    return false;
  }
});
logger.info("ProductCount="+numberOfProducts+" ArgSize=" + l.length());

const productIDs = tmpStore.create("args");
productIDs.write(l.toString());
productIDs.close();

for (var i = 1; i <= maxThreads; i++) {
  var startTime = new Date().getTime();
  var args = new java.util.HashMap()
  args.put("dataFile", productIDs);
  args.put("threads", new java.lang.Integer(i));
  //logger.info("args=" + args);
  LAALExportFunction.evaluate(args);


  var endTime = new Date().getTime();
  var duration = (endTime - startTime) / 1000;
  logger.info("Number of Threads=" + i + " Duration=" + duration.toFixed(1) + " seconds");
}



}