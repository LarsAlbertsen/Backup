/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "RevisionReport",
  "type" : "BusinessFunction",
  "setupGroups" : [ "RevisionAnalysis" ],
  "name" : "RevisionReport",
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
    "description" : "Node to report on"
  } ]
}
*/
exports.operation0 = function (logger,node) {
var setup = {
	doLog : true,
	logHeader : 'RevisionReport'
}

var replacer = function(key, value) {
	var returnValue = value;
	try {
		if (value.getClass() !== null) { 
			if (value instanceof java.lang.String) {
				returnValue = '' + value;
			} else {
				returnValue = '' + value;
			}
		}
	} catch (err) {
		// No worries... not a Java object
	}
	return returnValue;
};

function nvl(v) {
	return v ? v : '';
}

function n2s(n) {
	if (!n) {
		return 'n is null'
	}
	return n.getObjectType().getID() + ' ' + n.getID()
}

function log(msg, force) {
	if (setup.doLog || force) {
		logger.info(setup.logHeader + ': ' + (force?force+' ' :'') + msg)
	}
}

function getValue(n,attr, defvalue) {
	var v = n.getValue(attr) 
	if (v) {
		return v.getSimpleValue()
	}
	return defValue
}

function getAttributeChanges(rev) {
	var currentNode = rev.getNode();
	var res = []
	if (rev.getPredecessor()) {
		prevNode = rev.getPredecessor().getNode()
		prevNode.getValues().toArray().forEach(function(pv) {
			var aid = pv.getAttribute().getID();
			var cv = getValue(currentNode,aid,'');
			var pv = getValue(prevNode, aid, '')
			if (cv != pv) {
				res.push({attributeid : aid, oldvalue : nvl(pv), value : nvl(cv)})
			}
		})
	}
	return res;
}

function createRows(json) {
	var rs = json.attributeChanges.length;
	var res = []
	if (rs == 0) {
		rs = 1;
		var row = <tr></tr>;
		row.appendChild(<td class="tg-td" rowspan={rs}>{json.revName}</td>)
		row.appendChild(<td class="tg-td" rowspan={rs}>{json.created}</td>)
		row.appendChild(<td class="tg-td" rowspan={rs}>{json.edited}</td>)
		row.appendChild(<td class="tg-td" rowspan={rs}>{json.userid}</td>)
		row.appendChild(<td class="tg-td"></td>)
		row.appendChild(<td class="tg-td"></td>)
		row.appendChild(<td class="tg-td"></td>)
		res.push(row)
	} else {
		json.attributeChanges.forEach(function(c) {
			var row = <tr></tr>;
			if (res.length == 0) {
				row.appendChild(<td class="tg-td" rowspan={rs}>{json.revName}</td>)
				row.appendChild(<td class="tg-td" rowspan={rs}>{json.created}</td>)
				row.appendChild(<td class="tg-td" rowspan={rs}>{json.edited}</td>)
				row.appendChild(<td class="tg-td" rowspan={rs}>{json.userid}</td>)
				row.appendChild(<td class="tg-td">{c.attributeid}</td>)
				row.appendChild(<td class="tg-td">{c.oldvalue}</td>)
				row.appendChild(<td class="tg-td">{c.value}</td>)
			} else {
				row.appendChild(<td class="tg-td">{c.attributeid}</td>)
				row.appendChild(<td class="tg-td">{c.oldvalue}</td>)
				row.appendChild(<td class="tg-td">{c.value}</td>)
			}
			res.push(row)
		})
		
	}
	return res;
}
//############################## MAIN ##############################
log('Handling ' + n2s(node)) 

var res = [];
node.getRevisions().toArray().forEach(function(rev) {
	var prevRev = rev.getPredecessor();
	var json = {
		userid : rev.getUserID(),
		created : new Date(rev.getCreatedDate()).toISOString().replace(/T/, ' ').replace(/Z/, ' '),
		edited : new Date(rev.getEditedDate()).toISOString().replace(/T/, ' ').replace(/Z/, ' '),
		revName : rev.getName(),
		isFirst : prevRev ? false : true,
		attributeChanges : getAttributeChanges(rev)
	}
	res.push(json)
})


log(JSON.stringify(res, replacer, 2))

var style = 
'.tg {border-collapse:collapse;border-spacing:0;}\n'
+'.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;padding:10px 5px;word-break:normal;}\n'
+'.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:10px 5px;word-break:normal;}\n'
+'.tg .tg-th{text-align:left;vertical-align:top}\n'
+'.tg .tg-td{text-align:left;vertical-align:top}'


var html = <html>
	<style type="text/css">
		#STYLE#
	</style>
	<table class="tg">
		<thead>
		  <tr>
		    <th class="tg-th" rowspan="2">Revision</th>
		    <th class="tg-th" rowspan="2">Created</th>
		    <th class="tg-th" rowspan="2">Edited</th>
		    <th class="tg-th" rowspan="2">User</th>
		    <th class="tg-th" colspan="3">Changes</th>
		  </tr>
		  <tr>
		    <th class="tg-th">Attribute ID</th>
		    <th class="tg-th">Old Value</th>
		    <th class="tg-th">New Value</th>
		  </tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</html>;

res.forEach(function(doc) {
	var rows = createRows(doc)
	rows.forEach(function(row) {
		html.table.tbody.appendChild(row)	
	})
	
	
})

return ('' + html).replace(/#STYLE#/, style)
}