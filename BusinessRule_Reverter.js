/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Reverter",
  "type" : "BusinessAction",
  "setupGroups" : [ "RevisionAnalysis" ],
  "name" : "Reverter",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,logger) {
function log(msg) {
	logger.info(msg);
}


function listMethods(cls) {
	cls.class.getMethods().forEach(function(m) {
		if ('getTranslationTargets' == m.getName()) {
			log(m.getName())	
			var res = m.invoke(cls)	
			log(res)
		} 
		if ('getUnitConversionToBase' == m.getName()) {
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
var old = node.getRevisions().toArray()[2]

log(node.getValue('ELFRNumber').getSimpleValue())
log(old.getNode().getValue('ELFRNumber').getSimpleValue())
callMethod(old.getNode(), 'revert')
log(node.getValue('ELFRNumber').getSimpleValue())
}