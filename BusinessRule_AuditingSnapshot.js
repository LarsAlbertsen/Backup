/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AuditingSnapshot",
  "type" : "BusinessAction",
  "setupGroups" : [ "Snapshot" ],
  "name" : "AuditingSnapshot",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
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
exports.operation0 = function (node,logger,manager) {

function getJSDate(jDate) {
	return new Date(jDate.getTime())
}

function getValues(n) {
	var res = []
	n.getValues().toArray().forEach(function(v) {
		if (!v.isInherited()) {
			if (null != v.getSimpleValue()) {
				var val = {}
				val.aid = v.getAttribute().getID();
				val.value = v.getSimpleValue();
				res.push(val)								
			}
		}
	})
	return res;
}

function getReferences(n) {
	var res = {product: [], classification: [], asset: []};
	refTypeHome = manager.getReferenceTypeHome()
	refTypeHome.getProductReferenceTypes().toArray().forEach(function(rt) {
		n.queryReferences(rt).forEach(function(ref) {
			res.product.push({
				targetID : ref.getTarget().getID(),
				refType : rt.getID(),
				values : getValues(ref)
			})
			return true;				
		})
	})
	refTypeHome.getClassificationReferenceTypes().toArray().forEach(function(rt) {
		n.queryReferences(rt).forEach(function(ref) {
			res.classification.push({
				targetID : ref.getTarget().getID(),
				refType : rt.getID(),
				values : getValues(ref)
			})
			return true;				
		})
	})
	refTypeHome.getAssetReferenceTypes().toArray().forEach(function(rt) {
		n.queryReferences(rt).forEach(function(ref) {
			res.asset.push({
				targetID : ref.getTarget().getID(),
				refType : rt.getID(),
				values : getValues(ref)
			})
			return true;				
		})
	})

	return res;
}

function getData(n) {
	var res = {};
	res.time = getJSDate(n.getRevision().getEditedDate()).toISOString();
	res.revision = n.getRevision().getName();
	res.type = 'Product';
	res.id = n.getID();

	res.values = getValues(n);

	res.references = getReferences(n);
	return res;
}

manager.executeInWorkspace('Approved', function(amg) {
	logger.info(JSON.stringify(getData(amg.getObjectFromOtherManager(node).getTailRevision().getNode())));
	logger.info(JSON.stringify(getData(amg.getObjectFromOtherManager(node))))
})


}