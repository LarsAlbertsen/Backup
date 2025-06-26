/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "StreamingAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "Streaming" ],
  "name" : "StreamingAction",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
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
    "contract" : "StreamingMessageBindContract",
    "alias" : "message",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "StreamingExecutionReportLoggerBindContract",
    "alias" : "execLogger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,logger,message,execLogger) {
function log(msg) {
	logger.info('StreamingAction Logger: ' + msg)
	execLogger.logInfo('StreamingAction: ' + msg)
}

function logMeta() {
	log('Context ' + manager.getCurrentContext().getID())
	log('Workspace ' + manager.getCurrentWorkspace().getID())
	var md = message.metadata();
	log('md ' + md)
	log('offset ' + md.offset())
	log('partition ' + md.partition())
	log('topic ' + md.topic())
	var it = md.headers().iterator()
	while (it.hasNext()) {
		var header = it.next()
		log('header ' + new java.lang.String(header.key()) + '=' + new java.lang.String(header.value()))
	}
}

function getOrCreateProduct(parentid, id, type) {
	var p = manager.getProductHome().getProductByID(id);
	if (!p) {
		var pp = manager.getProductHome().getProductByID(parentid)
		if (pp) {
			p = pp.createProduct(id, type)
		}
	}
	return p;
}

function getCreateRef(/** @type{Product} */ src, tgt, type) {
	var ref = null
	src.queryReferences(type).forEach(/** @type{Reference} */ r => {
		if (tgt.equals(r.getTarget())) {
			ref = r;
			return false
		}
		return true;
	})
	if (!ref) {
		ref =  src.createReference(tgt, type)
	}
	return ref;
}

//############################## MAIN ##############################
//Access to headers and basic message information
var topic = message.metadata().topic()
var partition = message.metadata().partition()
var offset = message.metadata().offset()
var it = message.metadata().headers().iterator()
while (it.hasNext()) {
	var h = it.next()
	var k = h.key()
	var v = h.value()
}

//Content can for example be JSON
var data = new java.lang.String(message.content());
var doc = JSON.parse(data)
var p = getOrCreateProduct(doc.parentid, doc.id, doc.objecttype)
if (p) {
	p.setName(doc.name)
	doc.values.forEach(value => {
		var a = manager.getAttributeHome().getAttributeByID(value.attrid);
		if (a) {
			if (value.values) {
				var mvb = p.getValue(a.getID()).replace();
				value.values.forEach(s => {
					mvb.addValue(s)
				})
				mvb.apply()
			}
			else if (value.valueid) {
				p.getValue(a.getID()).setLOVValueByID​(value.valueid)
			} 
			else {
				p.setSimpleValue(a, value.value)
			}
		}
	});
	doc.references.forEach(ref => {
		if (ref.productid) {
			var target = manager.getProductHome().getProductByID(ref.productid)
			if (target) {
				var ref = getCreateRef(p, target, manager.getReferenceTypeHome().getReferenceTypeByID(ref.type))
			}
		} 
		else if (ref.assetid) {
			var target = manager.getAssetHome().getAssetByID(ref.assetid)
			if (target) {
				var ref = getCreateRef(p, target, manager.getReferenceTypeHome().getReferenceTypeByID(ref.type))
			}
		}
	})
	p.approve()
}

}