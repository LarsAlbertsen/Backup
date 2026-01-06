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
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "com.stibo.completenessscore.domain.metricresult.MetricBusinessFunctionResult",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "root",
    "parameterClass" : "null",
    "value" : null,
    "description" : "Look here and below"
  } ]
}
*/
exports.operation0 = function (logger,manager,root) {
function log(msg) {
	logger.info(msg)
}


var oCount = 0;
var nodeCount = 0;
var seen = {}
function checkNode(n) {
	var orphans = {}
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
				orphans[a] = v.getSimpleValue()
			}
		}
	})
	
	//n.queryChildren().forEach(child => {
	//	checkNode(child)
	//	return true;	
	//})
	return orphans
}



//############################## MAIN ##############################
var res = checkNode(root)
log('Node Count ' + nodeCount)
log('Orphan Count ' + oCount)
log('res ' + JSON.stringify(res))

var result = new com.stibo.completenessscore.domain.metricresult.MetricBusinessFunctionResult();
if (oCount > 0) {
	result.withScore(oCount)
	result.withMessage(root, JSON.stringify(res))
}




//logger.info(result)
//logger.info(builder.build())

//log(JSON.stringify(seen))
//Object.keys(seen).forEach(a=> {
//	log(a + '\t' + seen[a].length + '\t\t' + seen[a].slice(0,5) + '......')
//})
return result; //JSON.stringify(res)

}