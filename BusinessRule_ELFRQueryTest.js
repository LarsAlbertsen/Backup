/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRQueryTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRQueryTest",
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
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
exports.operation0 = function (logger,manager) {
function nowMs() {
    return java.lang.System.currentTimeMillis();
}

function queryViaQueryHome(attributeId, value) {
    var attr = manager.getAttributeHome().getAttributeByID(attributeId)
    var conditions = com.stibo.query.condition.Conditions;
    var queryHome = manager.getHome(com.stibo.query.home.QueryHome);
    var where = conditions.valueOf(attr).eq(String(value));
    var spec = queryHome.queryFor(com.stibo.core.domain.Product).where(where);
    var result = spec.execute();
    var out = [];
    result.forEach(function (product) {
        if (out.length < 25) {
            out.push(product);
            return true;
        }
        return false;
    });
    return out;
}

function queryViaSingleAttribute(attributeId, value) {
    try {
        var attr = manager.getAttributeHome().getAttributeByID(attributeId)
        var spec = new com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome.SingleAttributeQuerySpecification(
            com.stibo.core.domain.Product,
            attr,
            String(value)
        );
        var list = manager.getHome(com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome).querySingleAttribute(spec).asList(25);
        var out = [];
        var it = list.iterator();
        while (it.hasNext()) {
            out.push(it.next());
        }
        return out;
    } catch (e) {
        logger.info("SingleAttributeQuery failed attr=" + attributeId + " value=" + value + " error=" + (e.message || e));
        return [];
    }
}
var val  = 'KOqqDEJmd6QPImWtXIV3ZmqHGvTFEJ';


var startTime = nowMs()
for (var i = 0; i < 100; i++) {
	for (var x = 1; x < 10; x++) {
		queryViaQueryHome('Bullet0'+x, val)
	}
}
logger.info(nowMs() - startTime)


startTime = nowMs()
for (var i = 0; i < 100; i++) {
	for (var x = 1; x < 10; x++) {
		queryViaSingleAttribute('Bullet0'+ x, val)
	}
}
logger.info(nowMs() - startTime)


}