/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "BusinessFunctionMetric",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "BusinessFunctionMetric",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "com.stibo.completenessscore.domain.metricresult.MetricBusinessFunctionResult",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (node) {
var result = new com.stibo.completenessscore.domain.metricresult.MetricBusinessFunctionResult();
result.withScore(42);
result.withMessage(node, 'BFMetric');
//result.setNotApplicable()
return result;
}