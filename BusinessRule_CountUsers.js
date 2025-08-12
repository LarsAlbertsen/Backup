/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CountUsers",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "CountUsers",
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
  "functionParameterBinds" : [ ]
}
*/
exports.operation0 = function (root,logger,manager,xx) {
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


function isSupplierUser(u) {
	var isVendor = true
	u.getGroups().toArray().forEach(g => {
		if (!g.isVendor()) {
			isVendor = false
		}
		
	})
	return isVendor
}

var cnt = 0;
var cntNotVendor = 0;

root.queryAllUsers().forEach(function(u){
	cnt++
	if (!isSupplierUser(u)) {
		logger.info(u)
		cntNotVendor++
	}
	return true;	
})
logger.info('Total users under ' + root.getID() + ' ' + cnt)
logger.info('Not supplier user count ' + cntNotVendor)
logger.info('Supplier User Count ' + (cnt-cntNotVendor))

logger.info('About User Count ' + callMethod(manager.getUserHome(), 'getUserCount'))

logger.info('is Supplier ' + callMethod(manager.getUserHome().getUserByID('LAAL_SUP'), ))


return '';

}