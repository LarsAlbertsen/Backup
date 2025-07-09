/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRLS",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRLS",
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
    "contract" : "ManagerBindContract",
    "alias" : "step",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
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
    "alias" : "fn",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (step,logger,fn) {
var dir = new java.io.File("/" + fn)
var files = dir.listFiles()
if (!files) {
	files = []
	files.push(dir)
}

var tmp = (dir.getName() + '').split('/')
var fileToPrint = tmp[tmp.length - 1]

var counterDoc = {}

files.forEach(function(f) {
	logger.info((f.isDirectory()?'d':(f.isFile()?'f':'UnknownType')) + ' ' + f + (f.isDirectory()?'':'   length=' + f.length() + ' modified=' + (new Date(f.lastModified())).toISOString()))	
	if (f.isFile()) {
		var ext = f.getName().substring(f.getName().lastIndexOf('.') + 1)
		if (!counterDoc[ext]) {
			counterDoc[ext] = 0;		
		}
		counterDoc[ext] = counterDoc[ext] + 1;
	}
	if (f.isFile() &&  fileToPrint == f.getName()) {
		var sb = new java.lang.StringBuilder()
		var br = new java.io.BufferedReader(new java.io.FileReader(f))
		while (br.ready()) {
			//logger.info(br.readLine())
			sb.append(br.readLine()+"\n")
		}
		br.close()
		logger.info(sb.toString())

		if (f.getName().endsWith('.zip')) {
			var fis = new java.io.FileInputStream(f)
			var zis = new java.util.zip.ZipInputStream(fis)
			while((entry = zis.getNextEntry()) !== null) {
				logger.info('file: ' + entry.getName())
				
		    		var baos = new java.io.ByteArrayOutputStream();
			     var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
			     var len;
	
	 		     while ((len = zis.read(buffer)) > 0) {
		     	    baos.write(buffer, 0, len);
				 }
		
			     var content = new java.lang.String(baos.toByteArray(), "UTF-8");
			     logger.info("Content:\n" + content);
			     zis.closeEntry();
		
			}
			zis.close()
			fis.close()
			
		}
	}
})
logger.info('Number of files ' + files.length)
logger.info('Count by file extension ' + JSON.stringify(counterDoc,null, 2))



}