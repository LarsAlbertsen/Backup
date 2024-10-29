/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateUsers",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "CreateUsers",
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
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
    "contract" : "UserGroupBindContract",
    "alias" : "ug",
    "parameterClass" : "com.stibo.core.domain.impl.GroupImpl",
    "value" : "Super user",
    "description" : null
  }, {
    "contract" : "UserGroupBindContract",
    "alias" : "inactiveGroup",
    "parameterClass" : "com.stibo.core.domain.impl.GroupImpl",
    "value" : "Inactive",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,manager,ug,inactiveGroup) {
function log(msg) {
	logger.info(msg)
}

log(inactiveGroup.isVendor())

for (var x = 0; x < 10; x++) {
	//ug.createUser('TESTUSER-'+x + java.lang.System.currentTimeMillis())
}

}