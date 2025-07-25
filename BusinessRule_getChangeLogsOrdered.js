/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "getChangeLogsOrdered",
  "type" : "BusinessAction",
  "setupGroups" : [ "WhiteListTest" ],
  "name" : "getChangeLogsOrdered",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
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
exports.operation0 = function (manager,node) {


const allValues = node.getValues();

allValues.forEach(function (v) {
    const attr = v.getAttribute();
    var changeLogs = attr.getChangeLogsOrdered();
    logger.info("Attribute " + attr.getID() + " validator=" + attr.getValidatorName() + " changeLogs=" + changeLogs.size());

    /*for (var i=0; i<changeLogs.size(); i++) {
        const cl = changeLogs.get(i);
        logger.info(" "+i+"  "+cl.formattedAsText())
    }*/


    var it = changeLogs.iterator()
    while (it.hasNext()) {
        var e = it.next();
        logger.info("  " + e.formattedAsText())
    }

    if (attr.hasLOV()) {
        var lov = attr.getListOfValues()
        logger.info("  hasLov " + lov.getValidatorName());
        var lovChanges = lov.getChangeLogsOrdered();
        var it2 = lovChanges.iterator()
        while (it2.hasNext()) {
            var e = it2.next();
            logger.info("  lovChange " + e.formattedAsText())
        }
    }


})
}