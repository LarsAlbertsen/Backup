/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "EventsFilter",
  "type" : "BusinessCondition",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "EventsFilter",
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
  "pluginId" : "JavaScriptBusinessConditionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
/** @type{Product} */
var p = node;

log("on "+p.getID()+ "/"+p.getManager().getCurrentWorkspace().getID());


var nonApproved = p.getNonApprovedObjects();
logger.info("nonApproved="+nonApproved)
logger.info("Value "+p.getValue("LAAL_1").getSimpleValue())

nonApproved.forEach(element => {
    log(p.getID()+"\t"+element)
});

return true

function log(s) {
    logger.info("EventsFilter "+s);
}


}