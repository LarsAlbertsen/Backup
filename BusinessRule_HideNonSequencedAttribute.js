/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "HideNonSequencedAttribute",
  "type" : "BusinessCondition",
  "setupGroups" : [ "WebUIRules" ],
  "name" : "HideNonSequencedAttribute",
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
    "contract" : "AttributeGroupBindContract",
    "alias" : "ag",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeGroupImpl",
    "value" : "Booleans",
    "description" : null
  }, {
    "contract" : "HiddenContextBind",
    "alias" : "hidden",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,manager,ag,hidden) {
function log(m) {
	logger.info('HideNonSequencedAttribute: ' + m) 	
}

function getDisplaySequence(al) {
	var val = al.getValue('DisplaySequence')
	if (val) {
		return val.getSimpleValue() ? val.getSimpleValue() + '' : ''
	}
	return '';
}

function hasDisplaySequence(n,a) {
	if (!n) {
		return false;
	}
	var al = n.getAttributeLink(a)
	if (al) {
		return getDisplaySequence(al)
	}
	return hasDisplaySequence(n.getParent(), a)
}

ag.getAllAttributes().toArray().forEach(function(a) {
	if (!hasDisplaySequence(node, a)) {
		//log('Hiding ' + a)
		hidden.setHidden(node,a)
	}
})

return true

}