/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRProcessChildren",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "ELFRProcessChildren",
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
    "alias" : "parent",
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
exports.operation0 = function (parent,logger) {
var children = parent.getChildren().toArray()
logger.info(children.length)
children.forEach(function(c) {
	var ct = c.getTitle() + '';
	var cn = ct.substr(0, (ct.indexOf('-')>-1?ct.indexOf('-'):ct.length))
	if (ct.indexOf('-')<0) {
		cn = cn + '-' + (Math.random() + 1).toString(36).substring(7)
	}
	logger.info(cn)
	c.setName(cn)
})
}