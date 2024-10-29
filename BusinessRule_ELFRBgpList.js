/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRBgpList",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "ELFRBgpList",
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
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "step",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "StringBindContract",
    "alias" : "bgpid",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (logger,step,bgpid) {
var dir = new java.io.File('/shared/workarea/background-processarea/' + bgpid)
var files = dir.listFiles()
if (!files) {
	files = []
	files.push(dir)
}

var tmp = (dir.getName() + '').split('/')
var fileToPrint = tmp[tmp.length - 1]

files.forEach(function(f) {
	logger.info((f.isDirectory()?'d':(f.isFile()?'f':'UnknownType')) + ' ' + f)	
	if (f.isFile() &&  fileToPrint == f.getName()) {
		var sb = new java.lang.StringBuilder()
		var br = new java.io.BufferedReader(new java.io.FileReader(f))
		while (br.ready()) {
			//logger.info(br.readLine())
			sb.append(br.readLine())
		}
		br.close()
		logger.info(sb.toString().length())
		logger.info(sb.toString().substring(0,100))
	}
})



}