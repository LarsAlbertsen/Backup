/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRBackgroundProcessMonitor",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRBackgroundProcessMonitor",
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
    "alias" : "manager",
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
    "alias" : "bgpid",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (manager,logger,bgpid) {
function listMethods(cls) {
	cls.class.getMethods().forEach(function(m) {
		if ('getTranslationTargets' == m.getName()) {
			log(m.getName())	
			var res = m.invoke(cls)	
			log(res)
		} 
		if ('getInboundIntegrationEndpointByID' == m.getName()) {
			log(m.getName())	
			var res = m.invoke(cls)	
			log(res)
		}
	})
}

function callMethod(clazz, method, para) {
	if (para && para.length == 5) {
		return clazz.class.getMethod(method, para[0].type, para[1].type, para[2].type, para[3].type, para[4].type).invoke(clazz, para[0].value, para[1].value, para[2].value, para[3].value, para[4].value) 
	}
	if (para && para.length == 4) {
		return clazz.class.getMethod(method, para[0].type, para[1].type, para[2].type, para[3].type).invoke(clazz, para[0].value, para[1].value, para[2].value, para[3].value) 
	}
	if (para && para.length == 3) {
		return clazz.class.getMethod(method, para[0].type, para[1].type, para[2].type).invoke(clazz, para[0].value, para[1].value, para[2].value)
	}
	if (para && para.length == 2) {
		return clazz.class.getMethod(method, para[0].type, para[1].type).invoke(clazz, para[0].value, para[1].value)
	}
	if (para && para.length == 1) {
		return clazz.class.getMethod(method, para[0].type).invoke(clazz, para[0].value)
	}
	return clazz.class.getMethod(method).invoke(clazz)
}

function printBGP(bgp) {
	var status = callMethod(bgp, 'getStatus')
	if (status == 'running') {
		var doc = {}
		var execTime = callMethod(bgp, 'getExecutionTime')
		logger.info(execTime)
		var startTime = callMethod(bgp, 'getTextValue', [{type: java.lang.String, value:'bgprocess.starttime'}])
		var finishedTime = callMethod(bgp, 'getTextValue', [{type: java.lang.String, value:'bgprocess.finishedtime'}])
		doc['BgpID'] = bgp.getID()
		doc['Name'] = bgp.getTitle()
		doc['StartedBy'] = callMethod(bgp, 'getStartedBy')
		doc['StartAt'] = startTime
		doc['EndedAt'] = finishedTime
		doc['Status'] = status
		doc['Template'] = callMethod(bgp, 'getTemplateID')
		if (!finishedTime) {
			finishedTime = Date.now()
		}
		doc['Runtime'] =(finishedTime - startTime)
		logger.info(JSON.stringify(doc))
	}
}


var bgpHome = manager.getBackgroundProcessHome()
var processes = callMethod(bgpHome, 'getBackgroundProcesses')

var count = 0;
processes.forEach(function(bgp) {
	count++
	printBGP(bgp)
})
logger.info('Count ' + count)

//var bgp = bgpHome.getBackgroundProcessByID(bgpid)
//printBGP(bgp)

return "done"
}