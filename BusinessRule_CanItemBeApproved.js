/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CanItemBeApproved",
  "type" : "BusinessCondition",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "CanItemBeApproved",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : "ValidateBefore",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "item",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "DataIssuesContextBind",
    "alias" : "dir",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "attr",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ELFRA",
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "value",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ELFRA",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "msg",
    "message" : "Please correct value for {attr}",
    "translations" : [ {
      "language" : "da",
      "message" : "Venligst angiv værdi for {attr}"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (item,dir,attr,value,msg) {
if ('40016617x' == item.getID()) {
logger.info('XXXXXX ' + value)
	if (!value) {
		var m = new msg()
		m.attr = attr.getTitle()
		dir.addWarning(m, item, attr);

		return dir
	}
}
return true;


}