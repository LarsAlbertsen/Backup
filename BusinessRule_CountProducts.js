/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CountProducts",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "CountProducts",
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
var count = countProduct(node)
logger.info("Products below "+node.getTitle()+" " +count)



/**
 * Counts the number of products under the given top product node.
 *
 * @param {Product} topProduct - The top product node to count products under.
 * @returns {number} The count of products under the top product node.
 */
function countProduct(topProduct) {
    var count = 0;
    count++
    var children = topProduct.getChildren();
    if (children!=null) {
        for (var i = 0; i < children.size(); i++) {
            count += countProduct(children.get(i));
        }       
    }
    return count;
}
}