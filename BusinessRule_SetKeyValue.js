/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "SetKeyValue",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "SetKeyValue",
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
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "ItemKey",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ItemKey",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,ItemKey) {

try {
    node.setSimpleValue(ItemKey, '124');
    
} catch (err) { 

    if (err.javaException instanceof com.stibo.core.domain.key.UniqueKeyViolationException) {
        logger.info("Don't care about " + err.javaException.getMessage())
    }
	else {
	    throw err;
	}
}

logger.info('Continue');


}