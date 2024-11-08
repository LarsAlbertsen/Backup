/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ListBGP",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "ListBGP",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager) {

var bgpHome = manager.getBackgroundProcessHome()


// Set<BackgroundProcess> getBackgroundProcessesByType(String templateID, boolean onlyOwnProcesses);

var bgps = bgpHome.getBackgroundProcessesByType(new java.util.HashSet(), false);
logger.info("BGPs "+bgps)
}