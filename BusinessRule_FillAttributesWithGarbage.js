/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "FillAttributesWithGarbage",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "FillAttributesWithGarbage",
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
    "alias" : "item",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (item,manager) {

var ag = manager.getAttributeGroupHome().getAttributeGroupByID("Marketing")
ag.getAllAttributes().forEach(function(a) {
    item.setSimpleValue(a, java.util.UUID.randomUUID().toString());
})


manager.getAttributeGroupHome().getAttributeGroupByID("Global").getAllAttributes().forEach(function(/** @type{Attribute} */ a) {
	var validatorName = a.getValidatorName()
	if (a.getListOfValues()==null) {
		if ("text".equals(validatorName)) {
			logger.info(validatorName+ " " + a.getTitle())
			item.setSimpleValue(a, java.util.UUID.randomUUID().toString());
		}
	}
})

}