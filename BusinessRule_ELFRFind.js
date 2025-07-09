/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRFind",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRFind",
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
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "StringBindContract",
    "alias" : "path",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  }, {
    "contract" : "StringBindContract",
    "alias" : "what",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (path,what) {
//var command = ["sh", "-c", "find /tmp -type d -name 'BGP_33274337'" ]
var command = ["sh", "-c", "find " + path + " -type d -name '" + what + "'" ]
// Define the command to run

try {
    // Execute the command
    var process = java.lang.Runtime.getRuntime().exec(command);

    // Read the output
    var reader = new java.io.BufferedReader(
        new java.io.InputStreamReader(process.getInputStream())
    );

    var line;
    while ((line = reader.readLine()) != null) {
        logger.info(line);
    }

    reader.close();
    process.waitFor();
} catch (e) {
    print("Error: " + e);
}

return "Done"
}