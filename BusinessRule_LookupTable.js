/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LookupTable",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LookupTable",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Product user-type root" ],
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

var b = java.lang.System.currentTimeMillis();
var internalID;
for (var i = 0; i < CALLCOUNT; i++) {
	var a = manager.getAssetHome().getAssetByID("My Lookup Table")
	internalID = a.getInternalID();
}
logger.info("a="+internalID);
var m = java.lang.System.currentTimeMillis();


for (var i = 0; i < CALLCOUNT; i++) {
	var ai = manager.getAssetHome().getAssetByInternalID(internalID)
}
var e = java.lang.System.currentTimeMillis();
logger.info("ByID took " + (m - b) + " ms ");
logger.info("ByInternalID took " + (e - m) + " ms ");




logger.info("begin");

var h = manager.getHome(com.stibo.lookuptable.domain.LookupTableHome);

let start = java.lang.System.currentTimeMillis();

var total1 = 0;
for (var i = 0; i < CALLCOUNT; i++) {
    var v = h.getLookupTableValue("My Lookup Table", "X1009");
    total1 += v
}

let middle = java.lang.System.currentTimeMillis();

var total2 = 0;
var table = h.getLookupTable("My Lookup Table");
for (var i = 0; i < CALLCOUNT; i++) {
    var v1 = table.getValue("X1009", true);
	total2 += v1;
}


let end = java.lang.System.currentTimeMillis();

logger.info("getLookupTableValue took " + (middle - start) + " ms ");
logger.info("getLookupTable took " + (end - middle) + " ms ");


}