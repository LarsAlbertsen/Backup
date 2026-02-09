/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFROT",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFROT",
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
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "pRoot",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Product user-type root",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ ]
}
*/
exports.operation0 = function (logger,manager,pRoot) {
function log(msg) {
	logger.info(msg)
}

var seen = []

function list(ot, pad) {
	log(pad+ot.getID())
	if (seen.includes(ot.getID())) {
		log(pad + ' ..' + ot.getID())		
	} else {
		seen.push(ot.getID())
		ot.getChildren().toArray().forEach(function(child) {
			//if (!seen.includes(child.getID()))
				list(child, pad+ ' ')
		})
	}
}

list(pRoot, '')

}