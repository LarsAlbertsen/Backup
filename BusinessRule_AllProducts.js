/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AllProducts",
  "type" : "BusinessAction",
  "setupGroups" : [ "GlobalBusinessRulesRoot" ],
  "name" : "AllProducts",
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

var longStr = ""

print("1", node)

/**
 * 
 * @param {JavaLangString} pIndent 
 * @param {Product} pTop 
 * @returns 
 */
function print(pIndent, pTop) {
    if (pTop==null) {
        return;
    }
    logger.info(longStr)
    logger.info("size "+longStr.length)
    var allValues = pTop.getValues()
    logger.info(pIndent+pTop.getTitle());
    
    var children = pTop.getChildren();
    for (var i=0; i<children.size(); i++) {
        print(pIndent+"  ", children.get(i))
    }

}
}