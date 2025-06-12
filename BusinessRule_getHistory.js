/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "getHistory",
  "type" : "BusinessFunction",
  "setupGroups" : [ "Snapshot" ],
  "name" : "getHistory",
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
  } ]
}
*/
exports.operation0 = function (logger,node) {
const sdf = java.text.SimpleDateFormat("yyyy-MM-dd HH:mm.ss.SSS")
function handleTitle(n) {
	var titleInfo = {
		title: n.getTitle(),
		history: []
	}
	var prev = null;
	n.getRevisions().toArray().reverse().forEach(function(rev) {
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

function handleValues(n) {
	var  doc = {};
	n.getValues().toArray().forEach(function(v) {
		doc[v.getAttribute().getID()] = []	
	})
	
	var prev = null;
	n.getRevisions().toArray().reverse().forEach(function(rev) {
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


var res = {
	id: node.getID(),
	type: node.getURL().substring(0, node.getURL().indexOf("?")).replace("step://", ""),
	objectType: node.getObjectType().getID()
}

res.title = handleTitle(node)
res.values = handleValues(node)


return JSON.stringify(res,null, 2)
}