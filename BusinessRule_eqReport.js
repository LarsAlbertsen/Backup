/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "eqReport",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "eqReport",
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
    "contract" : "UserGroupBindContract",
    "alias" : "root",
    "parameterClass" : "com.stibo.core.domain.impl.GroupImpl",
    "value" : "Suppliers",
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "SecretBindContract",
    "alias" : "xx",
    "parameterClass" : "com.stibo.passwordparameter.PasswordParameter",
    "value" : "eRAjNzxQJ81jAUVjF4v9QDWSsyZ7tvnYsjF88Kkmyk8=",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "StringBindContract",
    "alias" : "eqID",
    "parameterClass" : "null",
    "value" : null,
    "description" : "Optional"
  } ]
}
*/
exports.operation0 = function (root,logger,manager,xx,eqID) {
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



var result = {
		
	};

var eqh = callMethod(manager, 'getEventQueueHome')
var eventQueues = callMethod(eqh, 'getAllEventQueues')
eventQueues.toArray().forEach(function(eq) {
	logger.info(eqID + ' : ' + eq.getID())
	if (eq.getID().equals(eqID) || !eqID) {
		result[eq.getID()] = {
			retainedSize : callMethod(eq, 'getRetainedSize')
			,oldest : callMethod(eq, 'getOldestUnreadEventDate')
			,countUnreadEventsExactly : callMethod(eq, 'countUnreadEventsExactly')
			,countUnreadEvents : callMethod(eq, 'countUnreadEvents')
		};
	}
})



var evphome = manager.getHome(com.stibo.core.domain.eventprocessor.EventProcessorHome)
var evp = callMethod(evphome, 'getEventProcessorByID', [{type: java.lang.String, value : eqID}])
var eq = callMethod(evp, 'getEventQueue')
result[eqID] = {
			retainedSize : callMethod(eq, 'getRetainedSize')
			,oldest : callMethod(eq, 'getOldestUnreadEventDate')
			,countUnreadEventsExactly : callMethod(eq, 'countUnreadEventsExactly')
			,countUnreadEvents : callMethod(eq, 'countUnreadEvents')
	
}



return JSON.stringify(result,null,2);

}