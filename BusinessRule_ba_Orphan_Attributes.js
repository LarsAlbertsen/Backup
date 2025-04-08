/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ba_Orphan_Attributes",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "Orphan Attributes",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "obj",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (obj) {
var values = obj.getValues();
var it = values.iterator();
while (it.hasNext()) {
	var value = it.next();
	if (value.isOrphan()) {
       logger.info(value.getAttribute().getID() + " : " + value.getValue());
	}
}
}