/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "getHistoryRCH",
  "type" : "BusinessFunction",
  "setupGroups" : [ "Snapshot" ],
  "name" : "getHistory Revision Change Home version",
  "description" : "Using RevisionChangeHome which is not public",
  "scope" : "Global",
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : true,
  "runPrivileged" : true,
  "onApprove" : "Never",
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
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
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  }, {
    "contract" : "DateBindContract",
    "alias" : "fromDate",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  }, {
    "contract" : "DateBindContract",
    "alias" : "toDate",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (logger,manager,node,fromDate,toDate) {
const sdf = java.text.SimpleDateFormat("yyyy-MM-dd HH:mm.ss.SSS")
const revHome = manager.getHome(com.stibo.core.domain.impl.unstable.revisionchange.RevisionChangeHomeImpl)

var res = {
	id: node.getID(),
	type: node.getURL().substring(0, node.getURL().indexOf("?")).replace("step://", ""),
	objectType: node.getObjectType().getID()
}

/**
 * Handles changes to the parent of the node in a revision.
 * Adds a history entry to the result object for each parent change, recording the previous and new parent IDs,
 * the creation and edit dates, revision name, and user ID. It checks if the parent history array exists and creates it if needed.
 * The function extracts the parent ID from the predecessor (if available) and the current node, formats the dates,
 * and appends the change to the history array.
 *
 * @param {Object} rev - The revision object.
 * @param {Object} po - The part object representing the parent change.
 */
function handleParent(rev, po) {
	if (!res.parent) {
		res.parent = {
			parent: node.getParent().getID(),
			history: []
		}
	}
	res.parent.history.push({
		from: rev.getPredecessor() && rev.getPredecessor().getNode() && rev.getPredecessor().getNode().getParent() ? rev.getPredecessor().getNode().getParent().getID() : '',
		to: rev.getNode().getParent().getID(),
		createdDate: sdf.format(rev.getCreatedDate()),
		editedDate: sdf.format(rev.getEditedDate()),
		revision: rev.getName(),
		userID: rev.getUserID()

	})

}

/**
 * Handles changes to the title of the node in a revision.
 * Ensures a title history array exists in the result object, then appends a new entry for each title change.
 * The entry records the previous and new titles, creation and edit dates, revision name, and user ID.
 * It retrieves the previous title from the predecessor (if available) and the current title from the node.
 *
 * @param {Object} rev - The revision object.
 * @param {Object} po - The part object representing the title change.
 */
function handleTitle(rev, po) {
	if (!res.title) {
		res.title = {
			title: node.getTitle(),
			history: []
		}
	}
	res.title.history.push({
		from: rev.getPredecessor() ? rev.getPredecessor().getNode().getTitle() : '',
		to: rev.getNode().getTitle(),
		createdDate: sdf.format(rev.getCreatedDate()),
		editedDate: sdf.format(rev.getEditedDate()),
		revision: rev.getName(),
		userID: rev.getUserID()
	})

}

/**
 * Safely retrieves the value of an attribute from a node.
 * Checks if the attribute exists in the manager's attribute home. If not, logs a warning and returns an empty string.
 * If the attribute exists, attempts to get its value from the node. If a value is present and has a simple value,
 * returns it; otherwise, returns an empty string. This prevents errors from missing or undefined attributes.
 *
 * @param {Object} n - The node object.
 * @param {string} aid - The attribute ID.
 * @returns {string} The simple value of the attribute, or an empty string if not found.
 */
function getValSafe(n, aid) {
	
	if (!manager.getAttributeHome().getAttributeByID(aid)) {
		logger.info('Unknown attribute with id ' + aid)	
		return '';
	}
	var v = n.getValue(aid);
	if (v && v.getSimpleValue()) {
		return v.getSimpleValue()
	}
	return ''
}

/**
 * Handles changes to attribute values in a revision.
 * Ensures a values object and an array for the specific attribute ID exist in the result object.
 * For each value change, appends an entry with the previous and new values (using getValSafe),
 * creation and edit dates, revision name, and user ID. This builds a history of changes for each attribute.
 *
 * @param {Object} rev - The revision object.
 * @param {Object} po - The part object representing the value change.
 */
function handleValue(rev, po) {
	if (!res.values) {
		res.values = {}
	}
	if (!res.values[po.getAttributeID()]) {
		res.values[po.getAttributeID()] = []
	}
	res.values[po.getAttributeID()].push({
		from: rev.getPredecessor() ? getValSafe(rev.getPredecessor().getNode(), po.getAttributeID()) : '',
		to: getValSafe(rev.getNode(), po.getAttributeID()),
		createdDate: sdf.format(rev.getCreatedDate()),
		editedDate: sdf.format(rev.getEditedDate()),
		revision: rev.getName(),
		userID: rev.getUserID()
	})
}

/**
 * Checks if a reference of a given type exists from the source node to the target ID.
 * Queries all references of the specified type from the source node, iterating through them to see if any
 * reference's target matches the given target ID. Returns true if found, otherwise false. Stops searching early if found.
 *
 * @param {Object} source - The source node.
 * @param {string} targetID - The target node ID.
 * @param {string} type - The reference type ID.
 * @returns {boolean} True if the reference exists, false otherwise.
 */
function hasRef(source, targetID, type) {
	var found = false;
	source.queryReferences(manager.getReferenceTypeHome().getReferenceTypeByID(type)).forEach(function (ref) {
		found = ref.getTarget().getID() == targetID;
		return !found;
	})
	return found;
}

/**
 * Handles changes to references in a revision.
 * Ensures a references object and an array for the specific reference type exist in the result object.
 * For each reference change, determines the operation (Create, Update, or Delete) by checking if the reference
 * exists in the current and predecessor nodes. Appends an entry with the target ID, operation, creation and edit dates,
 * revision name, and user ID. This builds a history of reference changes for each reference type.
 *
 * @param {Object} rev - The revision object.
 * @param {Object} po - The part object representing the reference change.
 */
function handleReference(rev, po) {
	if (po instanceof com.stibo.core.domain.partobject.ProductReferencePartObject) {
		
		if (!res.references) {
			res.references = {};
		}
		if (!res.references[po.getReferenceType()]) {
			res.references[po.getReferenceType()] = [];
		}
		res.references[po.getReferenceType()].push({
			targetid: po.getTargetID(),
			operation: hasRef(rev.getNode(), po.getTargetID(), po.getReferenceType())
				? rev.getPredecessor()
					? hasRef(rev.getPredecessor().getNode(), po.getTargetID(), po.getReferenceType()) ? 'Update' : 'Create'
					: 'Create'
				: 'Delete',
			createdDate: sdf.format(rev.getCreatedDate()),
			editedDate: sdf.format(rev.getEditedDate()),
			revision: rev.getName(),
			userID: rev.getUserID()
		})
	}

}

//############################## MAIN ##############################
var revs = []
node.getRevisions().toArray().every(function (rev) {
	if (rev.getEditedDate().before(toDate)) {
		revs.push(rev)
	}
	return rev.getEditedDate().after(fromDate)
})
//Putting oldest first, and newest last
revs = revs.reverse()

revs.forEach(function (rev) {
	//logger.info(rev.getName())
	revHome.getRevisionChanges(rev.getNode()).toArray().forEach(function (po) {
		//logger.info(po)
		if (po instanceof com.stibo.core.domain.partobject.NamePartObject) {
			handleTitle(rev, po)
		} else if (po instanceof com.stibo.core.domain.partobject.ProductReferenceValuePartObject) {
			logger.info('Unhandled ' + po)
		} else if (po instanceof com.stibo.core.domain.partobject.datacontainer.DataContainerValuePartObject) {
			logger.info('Unhandled ' + po)
		} else if (po instanceof com.stibo.core.domain.partobject.ValuePartObject) {
			handleValue(rev, po)
		} else if (po instanceof com.stibo.core.domain.partobject.ReferencePartObject) {
			handleReference(rev, po)
		} else if (po instanceof com.stibo.core.domain.partobject.ParentPartObject) {
			handleParent(rev, po)
		}
		else {
			logger.info('Unhandled ' + po)
		}
	})
})


//ogger.info(JSON.stringify(res, null, 2))
return JSON.stringify(res)
}