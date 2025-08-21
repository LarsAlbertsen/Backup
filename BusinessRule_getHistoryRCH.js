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

function hasRef(source, targetID, type) {
	var found = false;
	source.queryReferences(manager.getReferenceTypeHome().getReferenceTypeByID(type)).forEach(function (ref) {
		found = ref.getTarget().getID() == targetID;
		return !found;
	})
	return found;
}

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