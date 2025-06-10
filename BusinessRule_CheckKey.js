/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CheckKey",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "CheckKey",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
setKey()
logger.info('Done')




function setKey() {
	const a = node.getManager().getAttributeHome().getAttributeByID("ItemKey")
	
	try {
		node.setSimpleValue(a, "a unique value 104993");
		let v = node.getValue(a.getID()).getSimpleValue();
		logger.info('Value after v=' + v);
	}
	catch (err) {
		logger.info('0 err' + err.javaException);
		if (err.javaException instanceof com.stibo.core.domain.key.UniqueKeyViolationException) {
			logger.info('1 ' + err.javaException.getMessage())
			if (String(err.javaException.getMessage()).includes('UniqueKey constraint violated for')) {
				logger.info('2 UniqueKey constraint violated ')
				return null;
			}
		}
		logger.info('3')
		throw err;
	}

}

}