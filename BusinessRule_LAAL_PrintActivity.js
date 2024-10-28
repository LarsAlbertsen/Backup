/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LAAL_PrintActivity",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LAAL_PrintActivity",
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

var curDir = new java.io.File("./diag/activity/2023-04");
logger.info("curDir="+curDir.getAbsolutePath().toString());

var ff = getFiles(curDir,null);
logger.info("ff="+ff);

var activityFiles = getFiles(curDir,"log");
logger.info("logFiles="+activityFiles);

var lastActivity = activityFiles.get(activityFiles.size()-1);
logger.info("lastActivity="+lastActivity.getAbsolutePath().toString());
var a = readFile(lastActivity, "UTF-8");
logger.info(a);

function getFiles(pDir, pSuffix) {
	var rv = new java.util.ArrayList();
	var files = pDir.listFiles();
	for (var i=0; i<files.length; i++) {
		if (pSuffix==null || files[i].getName().endsWith(pSuffix)) {
			rv.add(files[i]);
		}
	}
	return rv;
}

function readFile(pFile, pEncoding) {
	var pp = java.nio.file.Paths.get(pFile.getAbsolutePath());
	var encoded = java.nio.file.Files.readAllBytes(pp);
	var str = new java.lang.String(encoded, pEncoding);
	return str;
}

}