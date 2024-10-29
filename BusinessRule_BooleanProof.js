/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "BooleanProof",
  "type" : "BusinessFunction",
  "setupGroups" : [ "WebUIRules" ],
  "name" : "BooleanProof",
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
	logHeader : 'BooleanProof',
	attributes : []
}

if (setup.attributes.length == 0) {
	var ag = manager.getAttributeGroupHome().getAttributeGroupByID('Booleans')
	ag.getAttributes().toArray().forEach(function(a) {
		setup.attributes.push(a)
	})
	setup.attributes.sort(function(a,b){return a.getTitle().compareTo(b.getTitle())});
}

function log(msg) {
	if (setup.doLog) {
		logger.info(setup.logHeader + ': ' + msg)
	}
}

function getValue(n, attrid, defaultValue) {
	var v = n.getValue(attrid);
	if (v) {
		return v.getSimpleValue() ? v.getSimpleValue() : defaultValue
	}
	return defaultValue;
}

function append(xml, v) {
	if (v) {
		xml.appendChild(v)
	}
	return xml;
}
//############################## MAIN ##############################
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

html.table.thead.tr.appendChild(<th>Value</th>)
var ix = 0;
setup.attributes.forEach(function(attr) {
	var row = <tr>
		<td>{attr.getTitle()}</td>
	</tr>;
	row.appendChild(append(<td class="td-same"></td>, getValue(node, attr.getID(), '')))
	ix++;
	html.table.tbody.appendChild(row)
})

return ('' + html).replace(/##STYLE##/, style);
}