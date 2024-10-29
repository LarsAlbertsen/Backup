/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ApprovalStatus",
  "type" : "BusinessFunction",
  "setupGroups" : [ "WebUIRules" ],
  "name" : "ApprovalStatus",
  "description" : null,
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
  } ]
}
*/
exports.operation0 = function (logger,manager,node) {
var setup = {
	doLog : true,
	logHeader : 'ApprovalStatus',
	attributes : []
}

if (setup.attributes.length == 0) {
	node.getValues().toArray().forEach(function(v) {
		if (!v.getAttribute().isDerived()) {
			setup.attributes.push(v.getAttribute())
		}
	})	
	setup.attributes.sort(function(a,b){return a.getTitle().compareTo(b.getTitle())});
}

function log(msg) {
	if (setup.doLog) {
		logger.info(setup.logHeader + ': ' + msg)
	}
}

function n2s(n) {
	return n.getObjectType().getID() + ' ' + node.getID() + ' ' + node.getTitle();
}

function getValue(n, attrid, defaultValue) {
	var v = n.getValue(attrid);
	if (v) {
		return v.getSimpleValue() ? v.getSimpleValue() : defaultValue
	}
	return defaultValue;
}

function checkNode(manager, node) {
	//{attrid, attrtitle, differs}
	var res = [];
	setup.attributes.forEach(function(attr) {
		var doc = {attrid : ''+attr.getID(), title : ''+attr.getTitle()};
		mainValue = getValue(node, attr.getID(), '');
		var approvedValue = manager.executeInWorkspace('Approved', function(am) {
			var an = am.getObjectFromOtherManager(node)
			return getValue(an, attr.getID(), '')	
		})
		doc.mainValue = mainValue + '';
		doc.approvedValue = approvedValue + '';
		doc.differs = mainValue != approvedValue;
		res.push(doc)
	})
	return res;
}

function prettyAppend(xml, v) {
	if (v) {
		var varr = v.split(/<multisep\/>/);
		varr.forEach(function(v) {
			xml.appendChild(v)
			xml.appendChild(<br/>);
		})
		//log('XXXXXXXXX ' + '  ' + v.split(/\r?\n|\r|\n/g))
	}
	return xml;
}

//############################## MAIN ##############################
log('Handling ' + n2s(node))
var start = Date.now()

var style = 
 '.at {border-collapse:collapse;border-spacing:0;}\n'
+'.at th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;font-weight:bold;overflow:hidden;padding:1px 5px;word-break:normal;}\n'
+'.at td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:10px;overflow:hidden;padding:1px 5px;word-break:normal;}\n'
+'.at .td-diff{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:10px;overflow:hidden;padding:1px 5px;word-break:normal;color:red;}\n'
+'.at .td-hover:hover span.apv{display:block}'
+'.at .td-same{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:10px;overflow:hidden;padding:1px 5px;word-break:normal;color:green;}\n'
+'.at .apv{display:none;position:absolute;border:1px;background-color:white;border-style:solid;border-width:1px;border-color:red;padding:3px;color:black;}'
     

var html = <html>
	<head>
		<style>##STYLE##</style>
	</head>
	<table class="at">
		<thead>
			<tr>
				<th>Attribute</th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
</html>;

var analysis = {
	neverApproved : false,
	Contexts : {
		Context1 : [],
		Context2 : [],
		Context3 : []
	}
	
}
if (node.getApprovalStatus().equals(com.stibo.core.domain.workspaceaware.NotInApproved)) {
	analysis.neverApproved = true
} else {
	Object.keys(analysis.Contexts).forEach(function(contextid) {
		html.table.thead.tr.appendChild(<th>{manager.getContextHome().getContextByID(contextid).getTitle()} ({contextid})</th>)
		manager.executeInContext(contextid, function(cm) {
			var cNode = cm.getObjectFromOtherManager(node)
			analysis.Contexts[contextid] = checkNode(cm, cNode)
		})
	})
}
//log(JSON.stringify(analysis, null, 2));
var ix = 0;
setup.attributes.forEach(function(attr) {
	var row = <tr>
		<td>{attr.getTitle()}</td>
	</tr>;
	Object.keys(analysis.Contexts).forEach(function(contextid) {
		var x = analysis.Contexts[contextid][ix];
		if (x.differs) {
			row.appendChild(prettyAppend(<td class="td-diff td-hover"></td>, x.mainValue).appendChild(prettyAppend(<span class="apv"></span>, x.approvedValue)))
		} else {
			row.appendChild(prettyAppend(<td class="td-same"></td>, x.mainValue))
		}
	})
	ix++;
	html.table.tbody.appendChild(row)	

})

log('Run time = ' + (Date.now() - start))

return ('' + html).replace(/##STYLE##/, style);
}