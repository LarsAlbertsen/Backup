/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ObjectCounter",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "ObjectCounter",
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
    "alias" : "queryHome",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "StringBindContract",
    "alias" : "par",
    "parameterClass" : "null",
    "value" : null,
    "description" : "json"
  } ]
}
*/
exports.operation0 = function (logger,manager,queryHome,par) {
par = {
	queries : [
		{
			label : 'Item',
			basetype: com.stibo.core.domain.Product, 
			type:'Item'
		},
		{
			label:'Supplier',
			basetype: com.stibo.core.domain.Classification,
			type:'SupplierClassification'
		}
	]
}
var res = {system:'KRMA'}

function doQ(def) {
	var itemType = manager.getObjectTypeHome().getObjectTypeByID(def.type)
	
	var c = com.stibo.query.condition.Conditions;
	var querySpecification = queryHome.queryFor(def.basetype).where(
		c.objectType(itemType)
	);
	var result = querySpecification.execute();
	
	var count = 0;
	result.forEach(function(p) {
		count++
		return true
	})
	res[def.label] = {}
	res[def.label].count = count
	
}

par.queries.forEach(function(def) {
	doQ(def)	
})

return JSON.stringify(res,null,2)
}