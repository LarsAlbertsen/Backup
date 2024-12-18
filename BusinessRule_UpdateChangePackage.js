/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "UpdateChangePackage",
  "type" : "BusinessAction",
  "setupGroups" : [ "TrackChanges" ],
  "name" : "Update ChangePackage",
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
  }, {
    "contract" : "CurrentEventQueueBinding",
    "alias" : "eventQueue",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,manager,eventQueue) {
logger.info("AddToChangePackage user=" + node.getManager().getCurrentUser().getID() + " node=" + node)

if (node != null) {

	var setupGroup = manager.getNodeFromURL("step://SetupGroup?editor=SetupGroup&contextid=Context1&id=AutoUpdateChangePackages&workspaceid=Main")
	//logger.info("SetupGroup " + setupGroup)

	/** @type{ChangePackageHome} */
	var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome)
	var cpID = "ChangedItems-" + node.getManager().getCurrentUser().getID()
	var cp = cpHome.getChangePackageByID(cpID)

	if (cp == null) {
		cp = cpHome.createChangePackage("AutoUpdateChangePackages", cpID)
		updateIDValue(setupGroup, cpID)
		cp.setName(cpID);
		cp.setSimpleValue(manager.getAttributeHome().getAttributeByID("GITBranch"), cpID)
	}

	if (!isOpen(cp)) {
		//log.info("AddToChangePackage reOpen")
		cp.reOpen()
	}

	//logger.info("AddToChangePackage "+eventQueue.getTitle())
	//eventQueue.republish(cp)

	if (node instanceof com.stibo.core.domain.impl.businessrule.RevisedBusinessActionImpl) {
		// maybe remove all of RevisableNode?
		//log.info("AddToChangePackage removing BR");
		cp.removeItem(node);
		return;
	}
	if (node instanceof com.stibo.core.domain.AttributeGroup ||
		node instanceof com.stibo.core.domain.setupgroup.SetupGroup) {
		//logger.info("AddToChangePackage addHierarchy " + node.getClass().getName())
		//cp.addHierarchy(node)
	}
	else {
		//logger.info("AddToChangePackage addItem " + node.getClass().getName())
		cp.addItem(node)
	}
}

/**
 * 
 * @param {StiboNode} pSetupGroup 
 * @param {string} pID 
 */
function updateIDValue(pSetupGroup, pID) {

	/** @type{MultiValue} */
	var changePackageIDs = pSetupGroup.getValue("AutoUpdatedChangePackages")
	var it = changePackageIDs.getValues().iterator();
	do {
		var cpID = it.next().getSimpleValue();
		if (pID.equals(cpID)) {
			return
		}
	} while (it.hasNext())

	changePackageIDs.addValue(pID)
}

/**
 * 
 * @param {ChangePackage} pCP 
 * @returns {boolean}
 */
function isOpen(pCP) {
	var state = pCP.getValue("ChangePackageState").getSimpleValue()
	logger.info("AddToChangePackage state = " + state)
	if ("Change Package (Sealed)".equals(state)) {
		//logger.info("isOpen(" + pCP.getName() + " false")
		return false
	}
	//logger.info("isOpen(" + pCP.getName() + " true")
	return true;
}


}