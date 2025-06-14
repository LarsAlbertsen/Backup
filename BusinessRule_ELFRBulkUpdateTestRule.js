/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRBulkUpdateTestRule",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRBulkUpdateTestRule",
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger) {
function log(txt) {
	logger.info('XYZ ' + txt)
}
function getVal(n, aid) {
	var v = n.getValue(aid);
	if (v) {
		return v.getSimpleValue() ? v.getSimpleValue() : 0
	}
	return 0
}

log('Begin ' + node.getID())

node.getValue('CostPrice').setSimpleValue(getVal(node, 'CostPrice') + 1)
node.getValue('Number').setSimpleValue(getVal(node, 'Number') + 1)

if ('33258267' == node.getID()) {
	node.getValue('CostPrice').setSimpleValue('hello')
}

log('End ' + node.getID())
}