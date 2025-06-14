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

function handleTitle(n, revisions) {
	var titleInfo = {
		title: n.getTitle(),
		history: []
	}
	var prev = null;
	revisions.forEach(function(rev) {
		if (prev) {
			if (!prev.getNode().getTitle().equals(rev.getNode().getTitle())) {
				titleInfo.history.push({
					from: prev.getNode().getTitle(),
					to: rev.getNode().getTitle(),
					createdDate: sdf.format(rev.getCreatedDate()),
					editedDate: sdf.format(rev.getEditedDate()),
					revision: rev.getName(),
					userID: rev.getUserID()
				})
			}
		}
		prev = rev;
	})

	
	return titleInfo;
}

function getValSafe(n, aid) {
	var v = n.getValue(aid);
	if (v && v.getSimpleValue()) {
		return v.getSimpleValue()
	}
	return ''
}

function handleValues(n, revisions) {
	var  doc = {};
	n.getValues().toArray().forEach(function(v) {
		doc[v.getAttribute().getID()] = []	
	})
	
	var prev = null;
	revisions.forEach(function(rev) {
		if (prev) {
			for (var key in doc) {
				vBefore = getValSafe(prev.getNode(), key)
				vNow = getValSafe(rev.getNode(), key)
				if (vBefore != vNow) {
					doc[key].push({
						from: vBefore,
						to: vNow,
						createdDate: sdf.format(rev.getCreatedDate()),
						editedDate: sdf.format(rev.getEditedDate()),
						revision: rev.getName(),
						userID: rev.getUserID()
					})
				}
			}
		}
		prev = rev;
	})
	for (var key in doc) {
		if (doc[key].length === 0) {
			delete doc[key]
		}
	}
	return doc;
}

function handleReferences(n, revisions) {
	function getRef(n, type, targetid) {
		
	}
	var doc = {
			type: '',
			target: {
				id:'',
				type: ''
			},
			values: []
		};
	var prev = null;
	revisions.forEach(function(rev) {
		if (prev) {
			var map = {}
			prev.getNode().getLocalReferences().asSet().toArray().forEach(function(pref) {
				map[pref.getReferenceType().getID()+'>'+pref.getTarget().getID()] = {prev : pref}
			})
			rev.getNode().getLocalReferences().asSet().toArray().forEach(function(ref) {
				if (!map[ref.getReferenceType().getID()+'>'+ref.getTarget().getID()]) {
					map[ref.getReferenceType().getID()+'>'+ref.getTarget().getID()] = {}
				}
				map[ref.getReferenceType().getID()+'>'+ref.getTarget().getID()].rev = ref
			})
		}
		prev = rev;
	})
}

//############################## MAIN ##############################
var revs = []
node.getRevisions().toArray().every(function(rev) {
	if (rev.getEditedDate().before(toDate)) {
		revs.push(rev)
	}
	return rev.getEditedDate().after(fromDate)
})
//Putting oldest first, and newest last
revs = revs.reverse()

var res = {
	id: node.getID(),
	type: node.getURL().substring(0, node.getURL().indexOf("?")).replace("step://", ""),
	objectType: node.getObjectType().getID()
}

res.title  = handleTitle(node, revs)
//res.values = handleValues(node, revs)
//res.links  = handleReferences(node, revs)

logger.info(JSON.stringify(res,null, 2))
return JSON.stringify(res,null, 2)
}