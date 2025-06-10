/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "setEMail",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "setEMail",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Operator user-type root" ],
  "allObjectTypesValid" : false,
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
    "alias" : "user",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (user) {


//user.setEMail("laal");

setEMail(user, "laal");


function setEMail(user, emailAddr){
	logger.info("1");
      var userClazz = user.getClass();
	logger.info("2");
      var userSetEMail = userClazz.getMethod("setEMail", java.lang.String);
	logger.info("3");

	userSetEMail.invoke(user, emailAddr)
	logger.info("4");
}
}