/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "UpdateBullets",
  "type" : "BusinessAction",
  "setupGroups" : [ "PAExampleRules" ],
  "name" : "UpdateBullets",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Branch", "Family", "Item", "Leaf", "ProductRoot", "Variant" ],
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (root,logger) {
function log(msg) {
	logger.info(msg)
}

function appendTo(n, aid, txt) {
	var v = n.getValue(aid).getSimpleValue()
	n.getValue(aid).setSimpleValue(v + txt)
}

var count = 0
function handle(n) {
	if (n.getObjectType().getID() == "Family" || n.getObjectType().getID() == 'Variant') {
		var now = new Date().toISOString();
		count++
		appendTo(n, 'Bullet02', 'x')
		appendTo(n, 'Bullet03', 'x')
		appendTo(n, 'Bullet04', 'x')
		appendTo(n, 'Bullet05', 'x')
		appendTo(n, 'Bullet06', 'x')
		appendTo(n, 'Bullet07', 'x')
		appendTo(n, 'Bullet08', 'x')
		appendTo(n, 'Bullet09', 'x')
		appendTo(n, 'Bullet10', 'x')
	} 
	n.queryChildren().forEach(child => {
		handle(child)
		return true;
	})	
}

handle(root)
log(count)
}