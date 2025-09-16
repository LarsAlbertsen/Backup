/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "getHash",
  "type" : "BusinessFunction",
  "setupGroups" : [ "eSig" ],
  "name" : "getHash",
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
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "StringBindContract",
    "alias" : "str",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (logger,str) {

function hash(str) {
	var _str = new java.lang.String(str)
	var digest = java.security.MessageDigest.getInstance('SHA-256')
	var bytes = digest.digest(_str.getBytes(java.nio.charset.StandardCharsets.UTF_8));
	var res = '';
	bytes.forEach(function(c) {
		var x = java.lang.Integer.toHexString(0xff & c)
		if (x.length() == 1) res += '0';
		res += x; 
	})
	return res;
	
}


return hash(str);
}