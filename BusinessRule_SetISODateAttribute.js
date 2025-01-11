/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "SetISODateAttribute",
  "type" : "BusinessAction",
  "setupGroups" : [ "PAExampleRules" ],
  "name" : "SetISODateAttribute",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Branch", "Item", "Leaf", "ProductRoot" ],
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
    "alias" : "root",
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
    "contract" : "AttributeBindContract",
    "alias" : "attr",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ISODateAttribute",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (root,logger,attr) {
function log(msg) {
	logger.info(msg)
}


function handle(n) {
	if (n.getObjectType().getID() == "Item") {
		var now = new Date().toISOString();
		n.getValue(attr.getID()).setSimpleValue(now.substring(0,10) + ' ' + now.substring(11,19))
	} else {
		n.queryChildren().forEach(child => {
			handle(child)
			return true;
		})	
	}
}

handle(root)
}