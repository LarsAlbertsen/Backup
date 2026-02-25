/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRQueryTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRQueryTest",
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
    "alias" : "QueryHome",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,manager,QueryHome) {
var c = com.stibo.query.condition.Conditions;
var user = manager.getUserHome().getUserByID('ELFR')
var userNew = manager.getUserHome().getUserByID('ELFR2')

var querySpecification = QueryHome.queryFor(com.stibo.core.domain.state.Task).where(
     c.assignee().in(user)
);
var result = querySpecification.execute();
var count = 0;
result.forEach(function(t) {
	count++
	//logger.info(t)
	//t.reassign(userNew)
	return true	
})
logger.info(count)


var color = manager.getAttributeHome().getAttributeByID('Color');
var length = manager.getAttributeHome().getAttributeByID('Length');
var width = manager.getAttributeHome().getAttributeByID('Width');
var height = manager.getAttributeHome().getAttributeByID('Height');


//logger.info(c.valueOf(length).numeric().gt('1'))





var co = c.valueOf(color).eq('Blue')
var l = c.valueOf(length).numeric().gt('1')
var w = c.valueOf(width).numeric().gt('1')
var h2 = c.valueOf(height).numeric().eq('2')
var h3 = c.valueOf(height).numeric().eq('3')

var cond1 = co.and(l).and(w).and(h2)
var cond2 = co.and(l).and(w).and(h3)

var qs = QueryHome.queryFor(com.stibo.core.domain.Product).where(
	cond1.or(cond2)
).execute()

qs.forEach(function(x) {
	logger.info(x)
	return true
})

}