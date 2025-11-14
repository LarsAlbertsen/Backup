/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateCollection",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "CreateCollection",
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
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "itemType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "Item",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,itemType) {
var collection = manager.getNodeCollectionHome().getTopNodeCollectionGroup().createNodeCollection("myCol10");

var rootProduct = manager.getProductHome().getTopProduct();

var l = new java.util.HashSet()
//l.add(rootProduct)



var c = com.stibo.query.condition.Conditions;
var h = manager.getHome(com.stibo.query.home.QueryHome);
var querySpecification = h.queryFor(com.stibo.core.domain.Product).where(c.objectType(itemType));;
var query = querySpecification.execute();


const maxProductCount = 1000000;
const batchSize = 1000;

var count = 0;
var total = 0;
const begin = Date.now();

query.forEach(function (node) {
	//handle node here
	count++;
	if (count < maxProductCount) {
		if ((count % 1000) == 0) {
			const now = Date.now();
			const diff = now - begin;

			const totalRate = count / (diff / 1000);
			logger.info("Processed " + count + " nodes in " + (diff / 1000).toFixed(2) + " seconds" + "\tTotal Rate: " + Math.floor(totalRate) + " nodes/sec");
		}
		l.add(node);
		if (l.size() > batchSize) {
			total += l.size()
			collection.addNodes(l);
			l = new java.util.HashSet()
		}
		return true;
	}
	else {
		return false;
	}
});

logger.info("Total "+(Date.now()-begin))

logger.info("Adding Rest " + l.size())
collection.addNodes(l);
logger.info("Done")
}