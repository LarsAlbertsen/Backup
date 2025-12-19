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
const collectionSize = 1000000
const progressBatch = 10000

var collection = manager.getNodeCollectionHome().getTopNodeCollectionGroup().createNodeCollection("myCol11");
var rootProduct = manager.getProductHome().getTopProduct();
var l = new java.util.HashSet()



var c = com.stibo.query.condition.Conditions;
var h = manager.getHome(com.stibo.query.home.QueryHome);
var querySpecification = h.queryFor(com.stibo.core.domain.Product).where(c.objectType(itemType));;
var query = querySpecification.execute();

var count = 0;
var total = 0;

let begin = new Date().getTime();

query.forEach(function (node) {
	//handle node here
	count++;
	if (count < collectionSize) {
		if ((count % progressBatch) == 0) {
			const now = new Date().getTime();
			const elapsed = now - begin;
			const timePerCount = elapsed / progressBatch;
			logger.info("Count: " + count + " Average (ms): " + timePerCount);

			begin = new Date().getTime();
		}
		l.add(node);
		if (l.size() > 1) {
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

logger.info("Adding Rest " + l.size())
collection.addNodes(l);
logger.info("Done")
}