/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "TestDev",
  "type" : "BusinessAction",
  "setupGroups" : [ "Testing" ],
  "name" : "TestDev",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : false,
  "onApprove" : "Never",
  "dependencies" : [ {
    "libraryId" : "AssertionsLibrary",
    "libraryAlias" : "assert"
  } ]
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
exports.operation0 = function (logger,manager,node,assert) {
function log(msg) {
	logger.info('TestDev: ' + msg)
}

var data = {
	nodes :[
		{
			type : 'p',
			otype : 'Item',
			parentid : '40994805',
			label : 'a',
			name : 'aaa',
			values : [
				{aid:'ELFRNumber', v:'12 mm'}
			]
		},
		{
			type : 'p',
			otype : 'Item',
			parentid : '40994805',
			label : 'b',
			name : 'bbb',
			values : [
				{aid:'ELFRNumber', v:'12 mm'}
			]
		},
		{
			type : 'p',
			otype : 'Level1',
			parentid : 'ProductsRoot',
			label : 'L1',
			name : 'L1'
		},
		{
			type : 'p',
			otype : 'Level2',
			parentLabel : 'L1',
			label : 'L2',
			name : 'L2'
		},
		{
			type : 'p',
			otype : 'Level3',
			parentLabel : 'L2',
			label : 'L3',
			name : 'L3'
		}
		

	],
	links : [
		{sourceLabel:'a', targetLabel:'b', type:'PtoP'}
	]
}


BuilderLib = function(logger, manager) {
	//label,Object
	var nodeMap = {}
	function buildProduct(doc) {
		var parent;
		if (doc.parentid) {
			parent = manager.getProductHome().getProductByID(doc.parentid)
		} else {
			parent = nodeMap[doc.parentLabel]
		}
		
		assert.NotNull(parent, 'Cannot find parent ' + (doc.parentid?doc.parentid:doc.parentLabel))
		var product = parent.createProduct('', doc.otype)
		assert.NotNull(product, 'Failed to create product ' + JSON.stringify(doc))
		nodeMap[doc.label] = product
		product.setName(doc.name)
		buildValues(product, doc.values)
	
	}
	function buildValues(n, values) {
		if (values) {
			values.forEach(function(v) {
				var a = manager.getAttributeHome().getAttributeByID(v.aid)
				assert.NotNull(a,'Cannot find attribute with ID ' + v.aid)
				n.setSimpleValue(a, v.v)	
			})
		}
	}
	var publicFunctions = {
		build : function(jsonDoc) {
			jsonDoc.nodes.forEach(function(doc) {
				//log(JSON.stringify(doc))
				if (doc.type === 'p') {
					buildProduct(doc)	
				}
				
			})
			jsonDoc.links.forEach(function(l) {
				var src = nodeMap[l.sourceLabel]
				var tgt = nodeMap[l.targetLabel]
				src.createReference(tgt, l.type)	
			})
		},
		getNodeMap : function() {
			return nodeMap;
		}
	}
	return publicFunctions
}

var bl = new BuilderLib(log, manager)
bl.build(data)
assert.Equals('12 mm', bl.getNodeMap()['a'].getValue('ELFRNumber').getSimpleValue())
assert.Equals('12 mm', bl.getNodeMap()['b'].getValue('ELFRNumber').getSimpleValue())
assert.HasRef(bl.getNodeMap()['a'], bl.getNodeMap()['b'], 'PtoP')
assert.HasParent(bl.getNodeMap()['L2'], bl.getNodeMap()['L1'], 'testlabel')
}