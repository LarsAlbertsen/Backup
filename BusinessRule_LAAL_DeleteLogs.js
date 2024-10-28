/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LAAL_DeleteLogs",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LAAL_DeleteLogs",
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
    "alias" : "logFileRoot",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,assetType,logFileRoot) {
var logDir = new java.io.File("/opt/stibo/step/diag/logs");

listFiles(logDir)
deleteFile('/opt/stibo/step/diag/logs/step.17.log')
deleteFile('/opt/stibo/step/diag/logs/step.18.log')
deleteFile('/opt/stibo/step/diag/logs/step.19.log')

function listFiles(pDir) {
	logger.info("Listing files in "+pDir.getAbsolutePath());
	var allFiles = pDir.listFiles();
	if (allFiles!=null) {
		for (var i=0; i<allFiles.length; i++) {
			var curFile = allFiles[i];
			if (curFile.isDirectory()) {
				//getFiles(curFile);
			}
			else {
				logger.info(curFile.getAbsolutePath())
			}
		}
	}		
}


function deleteFile(pPath) {
	var file = new java.io.File(pPath)
	if (file.exists()) {
		logger.info("Deleting file "+pPath)
		file.delete()
	}
	else {
		logger.info("File "+pPath+" does not exist")
	}
}


/*
var profilingDir = new java.io.File("/opt/stibo/step/diag/logs");
var maxCount = 1000;
var count = 0;
var foundFiles = 0;
var doUpload = true;
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
	foundFiles++;
	totalFileSize += pFile.length();
	
	if (count>=maxCount) {
		skipped++;
		return;
	}

	if (!doUpload) {
		logger.info("Was going to upload "+id);
		skipped++;
		return;
	}

	var asset = manager.getAssetHome().getAssetByID(id);
	if (asset==null) {
		logger.info("Create asset ID="+id);
		asset = logFileRoot.createAsset(id, assetType);
		asset.setName(id);
		copyFileToAsset(pFile, asset);
		count++;
		return;
	}
	skipped++;
}

function copyFileToAsset(pFile, pAsset) {
	logger.info("Uploading data from file "+pFile.getAbsolutePath());
	var is = new java.io.FileInputStream(pFile);
	pAsset.upload(is, pFile.getName());
	is.close();
}
*/
}