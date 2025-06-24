/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "MongoDBAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "MongoDB Action",
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
    "contract" : "MongoDBActionContext40BindContract",
    "alias" : "mongoContext",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "JSONBindContract40",
    "alias" : "mongoData",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (mongoContext,mongoData) {
// {_id: "<classification-id>", products : { { id: "<product-id1>", name: "<product-name1>"}, { id: "<product-id2", name: "<product-name2>"}, ... }

function getClassificationIDs(classrefs) {
    var result = new Array();
    if (classrefs != null) {
        for (i = 0; i < classrefs.targets.size(); ++i) {
            result.push(new String(classrefs.targets[i].targetID));
        }
    }
    return result;
}
 
var db = mongoContext.getMongo().getDB('extra');
var collection = db.getCollection('classificationproducts');
 
var classrefs = mongoData.references ? mongoData.references["Web Classifications"] : null;
 
var classificationIDs = getClassificationIDs(classrefs);
 
var deletequery = {"products.id" : mongoData._id, "_id" : { $nin :  getClassificationIDs(classrefs) }};
var adelete = { $pull : { products : { id : mongoData._id } } };
 
collection.update(deletequery, adelete, false, true);
 
var query = {"products.id" : mongoData._id };
var name = mongoData.name;
var update = { $set : { "products.$.name" : name } };
 
collection.update(query, update, false, true);
 
classificationIDs.map(function(item) {
    var query = { _id : item };
    var update = { $addToSet : { products : { id : mongoData._id, name : name } } };
    collection.update(query, update, true, false);
});
}