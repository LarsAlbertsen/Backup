/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "InlineReferences",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "InlineReferences",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (item) {
logger.info("Checking inlinereferences")
var allValues = item.getValues().toArray();
logger.info("allValues = "+allValues);
for (var i = 0; i < allValues.length; i++) {
    var value = allValues[i]
    var sValue = value.getSimpleValue();
    if (sValue!=null) {
	    logger.info("Value: " + value.getSimpleValue());
	    if (value instanceof com.stibo.core.domain.SingleValue) {
		    	var inline = value.getInlineReferences();
		    if (inline.size()>0) {
		    		logger.info("inline "+inline);
		    		var keys = inline.keySet().toArray();
		    		for (var k=0; k<keys.length; k++) {
		    			logger.info("inline "+k+"  key="+keys[k]);
		    			logger.info("inline "+k+"  value="+inline.get(keys[k]));
		    		}
		    }
		 }
	}
}


var env = java.lang.System.getenv();
logger.info("env="+env)

/*var envK = env.keySet().toArray();
for (var i=0;i<envK.length; i++) {
	var key = envK[i];
	var val = env[key]
	logger.info(key+"="+val);
}*/


var props = java.lang.System.getProperties();
logger.info(props);
var envK = props.keySet().toArray();
for (var i=0;i<envK.length; i++) {
	var key = envK[i];
	var val = props.getProperty(key)
	logger.info(key+"="+val);
}

var name = java.lang.System.getenv("STEP_EXTERNAL_SYSTEM_NAME")
logger.info(name)

logger.info(java.lang.System.getenv("HOSTNAME"))

}