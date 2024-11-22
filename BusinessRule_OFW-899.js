/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "OFW-899",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "OFW-899",
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

var allPRefs = node.getProductReferences()
logger.info("allPRefs "+allPRefs)

// "Item2Item"
var refType = node.getManager().getReferenceTypeHome().getReferenceTypeByID(null)
var rr = node.queryReferences(refType).asList(100)
logger.info("rr="+rr)
rr.forEach(function(r){
    logger.info("r="+r)
})

var rb = node.queryReferencedBy(null).asList(100)
rb.forEach(function(/** @type{Reference} */r){
    logger.info("rb="+r.getReferenceTypeString())
});


}