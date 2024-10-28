/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "RefreshProfilingData",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "RefreshProfilingData",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Product user-type root" ],
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "assetType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Asset user-type root",
    "description" : null
  }, {
    "contract" : "ClassificationBindContract",
    "alias" : "profilingRoot",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,assetType,profilingRoot) {
var profilingDir = new java.io.File("/opt/stibo/step/diag/logs");
var maxCount = 1000;
var count = 0;
var foundFiles = 0;
var doUpload = false;
var totalFileSize = 0;
var skipped = 0;

getFiles(profilingDir);
logger.info("Uploaded "+count+" profiling files");
logger.info("Found files "+foundFiles);
logger.info("skipped "+skipped);
logger.info("totalFileSize "+((totalFileSize/1024))/1024+"mb");

function getFiles(pDir) {
	logger.info("Getting files from "+pDir.getAbsolutePath());
	var allFiles = pDir.listFiles();
	if (allFiles!=null) {
		for (var i=0; i<allFiles.length; i++) {
			var curFile = allFiles[i];
			if (curFile.isDirectory()) {
				//getFiles(curFile);
			}
			else {
				getFile(curFile);
			}
		}
	}	
}

function getFile(pFile) {
	logger.info("Getting file from "+pFile.getAbsolutePath());
	var id = pFile.getName();
	if (!id.endsWith("-auto-prof.zip")) {
		return;
	}
	foundFiles++;
	totalFileSize += pFile.length();
	
	id = id.replace("-auto-prof.zip", "");

	if (count>=maxCount) {
		skipped++;
		return;
	}

	if (!doUpload) {
		//logger.info("Was going to upload "+id);
		skipped++;
		return;
	}

	var asset = manager.getAssetHome().getAssetByID(id);
	if (asset==null) {
		//logger.info("Create asset ID="+id);
		asset = profilingRoot.createAsset(id, assetType);
		asset.setName(id);
		copyFileToAsset(pFile, asset);
		count++;
		return;
	}
	skipped++;
}

function copyFileToAsset(pFile, pAsset) {
	//logger.info("Uploading data from file "+pFile.getAbsolutePath());
	var is = new java.io.FileInputStream(pFile);
	pAsset.upload(is, pFile.getName());
	is.close();
}

}