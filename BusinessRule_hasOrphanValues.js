/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "hasOrphanValues",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "hasOrphanValues",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "root",
    "parameterClass" : "null",
    "value" : null,
    "description" : "Look here and below"
  } ]
}
*/
exports.operation0 = function (logger,root) {
function log(msg) {
	logger.info(msg)
}

logger.info("Lars A...")

var oCount = 0;
var nodeCount = 0;
var seen = {}
function checkNode(n) {
	nodeCount++
	n.getValues().toArray().forEach(v => {
		if (v.isLocal()) {
			if (v.isOrphan()) {
				var a = v.getAttribute().getID() + ''
				if (!seen[a]) {
					seen[a] = []
				}
				seen[a].push(n.getID()+'');
				oCount++
			}
		}
	})
	
	n.queryChildren().forEach(child => {
		checkNode(child)
		return true;	
	})
}



//############################## MAIN ##############################
checkNode(root)
log('Node Count ' + nodeCount)
log('Orphan Count ' + oCount)

Object.keys(seen).forEach(a=> {
	log(a + '\t' + seen[a].length + '\t\t' + seen[a].slice(0,5) + '......')
})


}