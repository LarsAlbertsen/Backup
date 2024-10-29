/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Reflection2",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "Reflection2",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "UserBindContract",
    "alias" : "user",
    "parameterClass" : "com.stibo.core.domain.impl.UserImpl",
    "value" : "ELFR",
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "QueryHomeBindContract",
    "alias" : "qHome",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "a",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "MarketingDescription1",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,user,manager,qHome,a) {
function log(msg) {
	logger.info(msg)
}

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


/*
 
 */
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



//############################## Main ##############################
//var count = countObjects()
//log(count)

//var x = callMethod(node, 'getTranslationTargets')
//log(x)

var brh = callMethod(manager, 'getBusinessRuleHome')
log(brh)
/*
var br = callMethod(brh, 'getBusinessRuleByID', [{type:java.lang.String, value:'LogNode'}])
log(br)
log(br.getTailRevision().getNode())


var uh = manager.getUserHome()
log(callMethod(uh, 'getUserCount'))

var users = callMethod(uh, 'getUsers')
users.toArray().forEach(function(u) {
	if (u.getID().startsWith('AC')) {
  	  log(u + ' ' + u.getGroups())	
  	  
	}
})
*/
/*
var x = callMethod(node, 'getTranslationTargets')
x.toArray().forEach(function(nt) {
	var status = callMethod(nt, 'getTranslationStatus')
	var source = callMethod(nt, 'getSource')

	log(callMethod(source, 'getDimensionPoint').getID() + ' > ' + callMethod(nt, 'getDimensionPoint').getID() + '\t' + status)
	
})
*/
}