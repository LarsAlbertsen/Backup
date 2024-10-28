/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "SealChangePackage",
  "type" : "BusinessAction",
  "setupGroups" : [ "TrackChanges" ],
  "name" : "Seal ChangePackage",
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
exports.operation0 = function (manager,node) {
logger.info("SEALING " + node)

/** @type{ChangePackageHome} */
var cpHome = manager.getHome(com.stibo.core.domain.changepackage.ChangePackageHome)


var setupGroup = manager.getNodeFromURL("step://SetupGroup?editor=SetupGroup&contextid=Context1&id=AutoUpdateChangePackages&workspaceid=Main")
logger.info("SetupGroup " + setupGroup)

/** @type{MultiValue} */
var changePackageIDs = setupGroup.getValue("AutoUpdatedChangePackages")
var it = changePackageIDs.getValues().iterator();
do {
	var cpID = it.next().getSimpleValue();
	logger.info("AddToChangePackage checking for seal "+cpID)
	var cp = cpHome.getChangePackageByID(cpID)
	if (cp != null) {
		if (!isOpen(cp)) {
			log.info("AddToChangePackage reOpen "+cp.getTitle())
			cp.reOpen()
		}
		removeDeletedItems(cp)
		log.info("AddToChangePackage sealing "+cp.getTitle())
		cp.sealPackage("AutoSeal")
	}
} while (it.hasNext())



/**
* 
* @param {ChangePackage} pCP 
* @returns {boolean}
*/
function isOpen(pCP) {
	var state = pCP.getValue("ChangePackageState").getSimpleValue()
	logger.info("AddToChangePackage state = " + state)
	if ("Change Package (Sealed)".equals(state)) {
		logger.info("isOpen(" + pCP.getName() + " false")
		return false
	}
	logger.info("isOpen(" + pCP.getName() + " true")
	return true;
}

/**
 * 
 * @param {ChangePackage} pCP 
 */
function removeDeletedItems(pCP) {
	var allItems = pCP.getPrimaryItems();
	allItems.toArray().forEach(function (item) {
		if (item != null) {
			var n = pCP.getManager().getNodeFromURL(item);
			if (n == null) {
				logger.info("AddToChangePackage.removeDeletedItems item in package is deleted " + item)
				pCP.removeItem(item)
			}
		}
	})
}


}