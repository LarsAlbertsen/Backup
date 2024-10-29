/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Reflection",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "Reflection",
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
		if ('getUnitConversionsFromBase' == m.getName()) {
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



/*
var val = node.getValue('ELFRNumber')
log(val.getUnit())

var unit = val.getUnit()
listMethods(unit)

log('Xxxxxxxxx')
*/

function isReadOnlyUser(u) {
	var isReadOnly = true;
	u.getGroups().toArray().every(function(grp) {
		var rules = grp.class.getMethod('getPrivilegeRules').invoke(grp)
		rules.toArray().every(function(rule) {
			var actionSet = rule.class.getMethod('getActionSet').invoke(rule)
			var actions = actionSet.class.getMethod('getActions').invoke(actionSet);
			actions.toArray().every(function(action) {
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

function doSyssetup() {
	var ss = manager.class.getMethod('getSystemSetupHome').invoke(manager);
	var q = ss.class.getMethod('querySystemSetup', java.lang.String, java.lang.String, java.lang.String, java.lang.String).invoke(ss, 'VendorPortalVendortype',"",'Config',"")
	var qq = callMethod(ss, 'querySystemSetup', [{type:java.lang.String, value:'VendorPortalVendortype'}, {type:java.lang.String, value:''}, {type:java.lang.String, value:'Config'}, {type:java.lang.String, value:''}])
	qq.toArray().forEach(function(syssetup) {
		var k = syssetup + ''
	//	if (k.match(/Suppli/)) {
			log('getName='+ syssetup.class.getMethod('getName').invoke(syssetup) + '  getValue='+syssetup.class.getMethod('getValue').invoke(syssetup) + '   getParamType=' +syssetup.class.getMethod('getParamType').invoke(syssetup))		
	//	}
	})
}

function countUsers() {
	var uh = manager.getUserHome();
	log(callMethod(uh,'getUsers').stream()
		.filter(function(user) {return 'SWADMIN' != user.getID() && 'SERVICE' != user.getID()})
		.filter(function(user) {
			var isVendorUser = true
			user.getGroups().toArray().every(function(g) {
				isVendorUser = g.isVendor() && isVendorUser
				return isVendorUser	
			})
			return isVendorUser
		}).count())	
}
function countObjects() {
	var map = new java.util.HashMap()
	var c = com.stibo.query.condition.Conditions;
 	var querySpecification = qHome.queryFor(com.stibo.core.domain.Product)
 		.where(c.hierarchy().simpleBelow(node));
 	var result = querySpecification.execute();
 	result.forEach(function(p) {
 		if (!map.containsKey(p.getObjectType().getID())) {
 			map.put(p.getObjectType().getID(), new java.lang.Integer(0))
 		}
 		map.put(p.getObjectType().getID(), map.get(p.getObjectType().getID()) + 1)
 		//map.get(p.getObjectType().getID()) = map.get(p.getObjectType().getID()) + 1
 		return true	
 	})
 	return map;
}

//############################## Main ##############################
//var count = countObjects()
//log(count)


var uh = manager.getUserHome();
log(callMethod(uh,'getUsers').stream()
	.filter(function(user) {
		return 'SWADMIN' != user.getID() && 'SERVICE' != user.getID()
	})
	.filter(function(user) {
		log(user.getID() + ' ' + isReadOnlyUser(user))
		return !isReadOnlyUser(user)
	}).count())	


// When LOV has more than 5k values, the query returns empty result: com.stibo.core.domain.impl.AttributeImpl$SetQueryResultTooManyValuesImpl
var attr = manager.getAttributeHome().getAttributeByID('LargeLOVbasedAttr')
var qry = callMethod(attr, 'getValidListOfValuesValues', false)
log(qry)
qry.forEach(function(v) {
	log(v.getValue())
	return true	
})
attr = manager.getAttributeHome().getAttributeByID('ELFRALov')
qry = callMethod(attr, 'getValidListOfValuesValues', false)
log(qry)
qry.forEach(function(v) {
	log(v.getValue())
	return true	
})

/*
log('node=' + callMethod(node, 'getInternalID', []))
log('a   =' + callMethod(a, 'getInternalID', []))
log('val =' + callMethod(node.getValue(a.getID()), 'getInternalID', []))

log(callMethod(manager, 'getObjectByInternalID', [{type:java.lang.String, value:callMethod(node.getValue(a.getID()), 'getInternalID', [])}]))
*/

}