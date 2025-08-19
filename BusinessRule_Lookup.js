/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Lookup",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "Lookup",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager) {


const CALLCOUNT=100000;


logger.info("begin");

var h = manager.getHome(com.stibo.lookuptable.domain.LookupTableHome);

let start = java.lang.System.currentTimeMillis();

var total1 = 0;
for (var i = 0; i < CALLCOUNT; i++) {
    var v = h.getLookupTableValue("TestLookupTable", "3");
    total1 += v
}

let middle = java.lang.System.currentTimeMillis();

var total2 = 0;
var table = h.getLookupTable("TestLookupTable");
for (var i = 0; i < CALLCOUNT; i++) {
    var v1 = table.getValue("3", true);
	total2 += v1;
}


let end = java.lang.System.currentTimeMillis();

logger.info("getLookupTableValue took " + (middle - start) + " ms ");
logger.info("getLookupTable took " + (end - middle) + " ms ");


}