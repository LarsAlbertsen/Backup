/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LogNode",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "LogNode",
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
    "contract" : "AttributeBindContract",
    "alias" : "aa",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ELFRNumber",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "MessageA",
    "message" : "asdf",
    "translations" : [ ]
  }, {
    "variable" : "MessageB",
    "message" : "fdgdfgd",
    "translations" : [ ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,manager,aa,MessageA,MessageB) {
function log(msg) {
	logger.info('LogNode: ' + msg)
}

function randomstring(L) {
  var s = '';
  var randomchar = function() {
    var n = Math.floor(Math.random() * 62);
    if (n < 10) return n; //1-10
    if (n < 36) return String.fromCharCode(n + 55); //A-Z
    return String.fromCharCode(n + 61); //a-z
  }
  while (s.length < L) s += randomchar();
  return s;
}

log(node.getID() + ' ' + node.getObjectType().getID() + ' ' + node.getTitle())




//throw 'test'

//node.setName(randomstring(2001))

/*
node.getValues().toArray().forEach(function(v) {
	if (v.getSimpleValue()) {
		log(v.getAttribute().getID() + ' = ' + v.getSimpleValue())	
	}
})


var x = {query: "query { " +
  "product(id: \"1103461\", context: \"Context1\", workspace: \"Main\") {\n" +
    "id\n" +
    "title\n" +
  "}\n" +
"}"}
log(JSON.stringify(x))


log(node.getValue("MarketingDescription1").getValue())
log(node.getValue("MarketingDescription1").getSimpleValue())
log(node.getValue("StartDateUS").getValue())
*/

}