/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "SiemensTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "SiemensTest",
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
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "a4",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "a4",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "itemType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Item",
    "description" : null
  }, {
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
exports.operation0 = function (node,a4,itemType,manager) {

var product = manager.getProductHome().getProductByID("175167");
//forceDelete(product)
product.forcedelete(true)

var classification = manager.getClassificationHome().getClassificationByID("Dummy")
classification.forcedelete(true)


var entity = manager.getEntityHome().getEntityByID("176339")
entity.forcedelete(true)

// com.stibo.core.domain.impl.FrontProductImpl#forcedelete([class java.lang.Boolean])
function forceDelete(node){
    if (node != null){
        var clazz = node.getClass();
        var forceDelete = clazz.getMethod("forcedelete", java.lang.Boolean.TYPE);
        forceDelete.invoke(node, true);
    }
}



//var m = getFreeMemory()
var m = java.lang.Runtime.getRuntime().freeMemory();
logger.info("m="+m);

// java.lang.Runtime#freeMemory()
function getFreeMemory(){
    var clazz = java.lang.Runtime.getRuntime().getClass();
    var mfreeMemory = clazz.getMethod("freeMemory");
    var memory =  mfreeMemory.invoke(java.lang.Runtime.getRuntime());
    var memorykb = memory / 1024;
    var memorymb = memorykb / 1024;    return memorymb + " MB (" + memory + ")";
}


//removeValidity(null, a4);
// com.stibo.core.domain.impl.AttributeImpl#removeValidForObjectTypes([class com.stibo.scripting.impl.MethodInterceptNativeJavaObject])
//a4.removeValidForObjectTypes(itemType)
// INFO: Failed doing removeValidity: JavaException: com.stibo.core.domain.DependencyException: Cannot remove valid for object types with values
function removeValidity(logger, node){
    try{
        var objectType = node.getManager().getObjectTypeHome().getObjectTypeByID("Item");
        var clazz = node.getClass();
        var removeValidity = clazz.getMethod("removeValidForObjectTypes", com.stibo.core.domain.ObjectType);
        removeValidity.invoke(node, objectType); //returns boolean
    } catch(e) {
        if(e.javaException){
            log.log(java.util.logging.Level.SEVERE, e.javaException.getMessage(), e.javaException)
        }
        log.info("Failed doing removeValidity: " + e)
    }}

// a4.delete()
// com.stibo.core.domain.impl.AttributeImpl#delete()
function deleteAttribute(attribute){
    if (attribute != null){
        var clazz = attribute.getClass();
        var deleteAttribute = clazz.getMethod("delete");
        deleteAttribute.invoke(attribute);
    }
}


var collectionID = "101182";
//refreshCollection(collectionID)
var collection = manager.getNodeCollectionHome().getNodeCollectionByID(collectionID)
collection.updateNodes(false)


// com.stibo.core.domain.impl.NodeCollectionImpl#updateNodes([class java.lang.Boolean])
function refreshCollection(collectionID){
    // first get the NodHomes's getObjectByID method by reflection
    var nodeHome = manager.getNodeHome();
    var nodeHomeClazz = nodeHome.getClass();
    var nodeHomeGetObjectByID = nodeHomeClazz.getMethod("getObjectByID", java.lang.String, java.lang.Class);    //use getObjectByID to get the collection
    var collection = nodeHomeGetObjectByID.invoke(nodeHome, collectionID, com.stibo.core.domain.collection.NodeCollection);
    if (collection){
        var collectionClazz = collection.getClass(); //updateNodes        //Get the NodeCollection method I need
        var updateNodes = collectionClazz.getMethod("updateNodes", java.lang.Boolean.TYPE);
        var countNodes = updateNodes.invoke(collection, java.lang.Boolean.valueOf(false));
        logger.info(countNodes);
    }} 


 
}