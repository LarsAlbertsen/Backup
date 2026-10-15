/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "usersExtract",
  "type" : "BusinessAction",
  "setupGroups" : [ "Auditing" ],
  "name" : "usersExtract",
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
exports.operation0 = function (manager,logger) {
var res = [];
var special = ['STIBO.I.02DDF019FC14FE8B91C3B78EDFED245C','STIBO.I.67C588FB33F315039DABE241B88A2FA8','STIBO.I.F172CC68D84BC17B4DCAFA36D5AD75DC']
var aiGroup = manager.getGroupHome().getGroupByID('AI.AgenticUsers')

function getAgentInfo(user) {
	var res = {isagent : user.getGroups().contains(aiGroup)};
	if (user.getID().startsWith('STIBO.I')) {
		var name = user.getName() + '';
		var parts = name.split(/ /);
		if (parts.length == 5) {
			res.isagent = true
			res.impersonator = parts[0]
			res.impersonatee = parts[4]
		} else if (parts.length == 3) {
			res.impersonator = parts[0]
			res.impersonatee = parts[2]
		}
	}

	return res
}

function isSupplier(user) {
	var res = true;
	user.getGroups().toArray().forEach(function(grp) {
		res = res && grp.isVendor();
	})
	return res;
}

function handleUser(user) {
	var res = {'_id':user.getID()}
	res.id = user.getID()
	res.name = user.getName();
	var ai = getAgentInfo(user)
	res.isAgentUser = ai.isagent;
	if (ai.impersonator) {
		res.impersonate = {impersonator : ai.impersonator, impersonatee : ai.impersonatee}
	}
	res.isSupplierUser = isSupplier(user)
	return res;
}

special.forEach(function(uid) {
	res.push(handleUser(manager.getUserHome().getUserByID(uid)))	
})

manager.getGroupHome().queryAllGroups().forEach(function(grp) {
	grp.queryAllUsers().forEach(function(user) {
		res.push(handleUser(user))
		return true;	
	})
	return true;
})



logger.info(JSON.stringify(res,null,2))

/*
var u = manager.getUserHome().getUserByID('STIBO.I.67C588FB33F315039DABE241B88A2FA8')
u = manager.getUserHome().getUserByID('STIBO.I.F172CC68D84BC17B4DCAFA36D5AD75DC')
u = manager.getUserHome().getUserByID('STIBO.I.02DDF019FC14FE8B91C3B78EDFED245C')

logger.info(u);
logger.info(u.getTitle())
logger.info(u.getGroups())




var qry = manager.getGroupHome().queryAllGroups()
qry.forEach(function(g) {
	//logger.info(g)
	return true;
})
*/

}