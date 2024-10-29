/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "HelltyScreenFieldSuppression",
  "type" : "BusinessCondition",
  "setupGroups" : [ "Hellty" ],
  "name" : "HelltyScreenFieldSuppression",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "HiddenContextBind",
    "alias" : "hidden",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "groupValue",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "GroupingAttribute",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,manager,hidden,groupValue) {
var setup = {
	groupAttr : 'GroupingAttribute',
	allGroups : ['GE1','GE2'],
	groups : {
		'Group 1' : ['GE1'],
		'Group 2' : ['GE2'],
		'DEFAULT' : ['GE1', 'GE2']		
	}
}

function log(m) {
	logger.info('HelltyScreenFieldSuppression: ' + m) 	
}

function getGroupID(n) {
	var v = n.getValue(setup.groupAttr);
	if (v) {
		return v.getID()
	}
	return 3;
}

log('GroupValue=' + groupValue)

var toShow = new java.util.HashSet()
if (groupValue) {
	var groupsToShow = setup.groups[groupValue] ? setup.groups[groupValue] : setup.groups['DEFAULT']
	groupsToShow.forEach(function(agid) {
		var ag = manager.getAttributeGroupHome().getAttributeGroupByID(agid)	
		ag.getAttributes().toArray().forEach(function(a) {
			toShow.add(a)		
		})
	})
}  

setup.allGroups.forEach(function(agid) {
	var ag = manager.getAttributeGroupHome().getAttributeGroupByID(agid)	
	ag.getAttributes().toArray().forEach(function(a) {
		if (toShow.contains(a)) {
			//
		} else {
			hidden.setHidden(node, a)
		}
	})
})

return true
}