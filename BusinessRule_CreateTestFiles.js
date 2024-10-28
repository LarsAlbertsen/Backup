/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateTestFiles",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "CreateTestFiles",
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
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function () {
//var dir = new java.io.File("/workarea/background-processarea/Exporter/BGP_174657");
var dir = new java.io.File("/shared/workarea/background-processarea/Exporter/BGP_32154606");
if (!dir.exists()) {
	logger.info(dir.getAbsolutePath()+" does not exist");
	return;
}
var files = dir.listFiles();
if (files==null || files.length==0) {
	logger.info("no files in "+dir.getAbsolutePath());
	return;
}
for (var i=0; i<files.length; i++) {
	var file = files[i];
	if (file.isDirectory()) {
		logger.info(file.getAbsolutePath()+" is Directory");
	}
	else {
		logger.info(file.getAbsolutePath()+" is a File");
	}
}

for (var i=0; i<5000; i++) {
	var newFile = new java.io.File(dir, "Lars-"+i);
	
	//newFile.delete();
	//var fos = new java.io.FileOutputStream(newFile);
	//fos.close();
}
logger.info("Done");

}