/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "JavaScriptLoggingExample",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "JavaScriptLoggingExample",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
logger.info("This is a INFO message for new jslog");
logger.warning("This is a WARNING message for new jslog");
logger.severe("This is a SEVERE message for new jslog");
logger.finest("This is a FINEST message for new jslog");
logger.finer("This is a FINER message for new jslog");
logger.fine("This is a FINE message for new jslog");
logger.config("This is a CONFIG message for new jslog");
}