/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CountUsers",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
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
    "contract" : "QueryHomeBindContract",
    "alias" : "qHome",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,manager,qHome) {
function log(msg) {
	logger.info(msg)
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

function isReadOnlyUser(u) {
	var isReadOnly = true;
	u.getGroups().toArray().every(function(grp) {
		var rules = grp.class.getMethod('getPrivilegeRules').invoke(grp)
		rules.toArray().every(function(rule) {
			var actionSet = rule.class.getMethod('getActionSet').invoke(rule)
			var actions = actionSet.class.getMethod('getActions').invoke(actionSet);
			actions.toArray().every(function(action) {
				//log('action ' + u.getID())
				var isView = action.class.getMethod('isViewAction').invoke(action) == true;
				if (!isView) {
					isReadOnly = false
				}
				return isReadOnly
			})
			return isReadOnly
		})
		return isReadOnly
	})
	return isReadOnly
}

//############################## Main ##############################

var uh = manager.getUserHome();
log(callMethod(uh,'getUsers').stream()
	.filter(function(user) {
		return 'SWADMIN' != user.getID() && 'SERVICE' != user.getID()
	})
	.filter(function(user) {
		log(user.getID() + ' ' + isReadOnlyUser(user))
		return !isReadOnlyUser(user)
	}).count())	


}