/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRScheduleCalculaterTest",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRScheduleCalculaterTest",
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
  "binds" : [ {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.util.Date",
  "functionParameterBinds" : [ {
    "contract" : "DateBindContract",
    "alias" : "afterDate",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (logger,afterDate) {
afterDate = new java.util.Date()
logger.info('afterDate ' + afterDate)
var calendar = java.util.Calendar.getInstance();
calendar.setTime(afterDate);

calendar.add(java.util.Calendar.MINUTE, 5);
return calendar.getTime();




}