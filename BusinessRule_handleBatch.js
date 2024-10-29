/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "handleBatch",
  "type" : "BusinessAction",
  "setupGroups" : [ "GroupA" ],
  "name" : "handleBatch",
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
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "EventProcessorEventBatchBindContract",
    "alias" : "eBatch",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,manager,eBatch) {
function log(msg) {
	logger.info('handleBatch: ' + msg)
}

log('Node ' + node)
log('eBatch ' + eBatch)
log('eBatch size ' + eBatch.getEvents().toArray().length)



eBatch.getEvents().toArray().forEach(function(e) {
	if ('42037605nnn' == e.getNode().getID()) {
		throw 'my error'
	} else {
		e.getNode().setName(e.getNode().getID() + 'laal')
	}
})

}