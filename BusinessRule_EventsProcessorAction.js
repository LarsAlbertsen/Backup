/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "EventsProcessorAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "EventsProcessorAction",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item" ],
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

log(" Value "+p.getValue("LAAL_1").getSimpleValue());

var nonApproved = p.getNonApprovedObjects();
nonApproved.forEach(element => {
    log(p.getID()+"\t"+element)
});


function log(s) {
    logger.info("EventsProcessorAction "+s);
}


}