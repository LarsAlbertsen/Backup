/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "CreateTestData",
  "type" : "BusinessAction",
  "setupGroups" : [ "TestBR" ],
  "name" : "Create Test Data",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "TestItem" ],
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ClassificationBindContract",
    "alias" : "ClassificationRoot",
    "parameterClass" : "com.stibo.core.domain.impl.FrontClassificationImpl",
    "value" : "TestClassifications",
    "description" : null
  }, {
    "contract" : "ObjectTypeBindContract",
    "alias" : "ClassificationObjType",
    "parameterClass" : "com.stibo.core.domain.impl.ObjectTypeImpl",
    "value" : "TestClassification",
    "description" : null
  }, {
    "contract" : "ClassificationProductLinkTypeBindContract",
    "alias" : "TestLink",
    "parameterClass" : "com.stibo.core.domain.impl.ClassificationProductLinkTypeImpl",
    "value" : "TestLink",
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "TestClassificationKey",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "TestClassificationKey",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,ClassificationRoot,ClassificationObjType,TestLink,TestClassificationKey) {
var attributeCount = 10;
var numberOfRevisions = 10;

var startTime = java.lang.System.currentTimeMillis();
var revBefore = node.getRevisions().size();
var count=0;
for (var r=0; r<10 && r<node.getRevisions().size()<numberOfRevisions; r++) {
		logger.info("r="+r);
		for (var i=1; i<=attributeCount; i++) {
			var attrID = "Garbage-"+i;
			var attr = manager.getAttributeHome().getAttributeByID(attrID);
			//logger.info(attr.getTitle());
			node.setSimpleValue(attr, java.util.UUID.randomUUID().toString());
		}
		count++;
		createLink(node, r);
		node.approve();
}
if (count>0) {
	var endTime = java.lang.System.currentTimeMillis();
	logger.info("LotsOfGarbage ID="+node.getID()+" revBefore="+ revBefore + " revAfter="+ node.getRevisions().size()+   " revCreated="+count+ " time="+((endTime-startTime)/1000));
}

function createLink(currentNode, count) {
	logger.info("createLink "+count);
	// Link Classification
	var keyHome = manager.getKeyHome();
	var myID = ""+node.getID();
	logger.info("["+myID+"]");
	var classificationKey = myID.substring(myID.length-2)+"-"+count;
	logger.info("["+classificationKey+"]");
	var target = keyHome.getObjectByKey("TestClassificationKey", classificationKey);
	if (target==null) {
		logger.info("CreateTarget");
		target = ClassificationRoot.createClassification("", ClassificationObjType);
		target.setSimpleValue(TestClassificationKey, classificationKey);
		target.setName(classificationKey);
	}
	logger.info("Target "+target.getID());
	// check if we are already referencing it
	var foundExisting = false;
	target.queryClassificationProductLinks().forEach(function(link) {
		logger.info("checkLink "+link);
		var product = link.getProduct();
		logger.info("0 "+currentNode);
		logger.info("1 "+currentNode.getID());
		logger.info("2 "+product.getID());
		if (product.getID().equals(currentNode.getID())) {
			logger.info("found existing");
			foundExisting = true;
		}
		return true;
	});
	if (!foundExisting) {
		target.createClassificationProductLink(node, TestLink);
	}	
}



}