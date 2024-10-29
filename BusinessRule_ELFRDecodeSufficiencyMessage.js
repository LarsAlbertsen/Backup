/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRDecodeSufficiencyMessage",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "ELFRDecodeSufficiencyMessage",
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
    "alias" : "codedString",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (logger,codedString) {
function decompress(bytes) {
	if (!bytes) {
		return null
	}
	try {
		var gzipInput = new java.util.zip.GZIPInputStream(new java.io.ByteArrayInputStream(bytes))
		var stringWriter = new java.io.StringWriter();
		org.apache.commons.io.IOUtils.copy(gzipInput, stringWriter, java.nio.charset.StandardCharsets.UTF_8);
	     return stringWriter.toString();
	} catch (e) {
		logger.info(e)
		return ""
	}
}

var bytes = java.util.Base64.getDecoder().decode(codedString)
return decompress(bytes)
}