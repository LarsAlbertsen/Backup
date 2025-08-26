/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "checkTranslation",
  "type" : "BusinessAction",
  "setupGroups" : [ "WhiteListTest" ],
  "name" : "checkTranslation",
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

var targets = node.getTranslationTargets();
logger.info("targets="+targets);
var it = targets.iterator();
while (it.hasNext()) {
	var e = it.next()
	logger.info("e="+e);
	logger.info("e.status="+e.getStatus());
	logger.info("e.source="+e.getSource());
}


var oo = node.getTranslationMaster()
logger.info("oo="+oo)

var dimensionPoints = node.getDimensionPoints();
logger.info("dimensionPoints="+dimensionPoints);


var currentTranslation = node.getCurrentTranslation()
logger.info("getCurrentTranslation="+currentTranslation);
if (currentTranslation!=null) {
	logger.info("has currentTranslation "+currentTranslation);
	//currentTranslation.setStatus(
}

logger.info("Checking");

var currentTranslation = node.getCurrentTranslation()
if(currentTranslation != null) {
  var currentTranslationStatus = currentTranslation.getStatus();
  logger.info("currentTranslationStatus="+currentTranslationStatus)

	var translationStatusDone = currentTranslationStatus.fromValue("dirty");
  logger.info("translationStatusDone="+translationStatusDone)
  
  currentTranslation.setStatus(translationStatusDone)
  logger.info("done");
}
}