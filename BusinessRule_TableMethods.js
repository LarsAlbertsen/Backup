/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "TableMethods",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "TableMethods",
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
    "alias" : "item",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (item) {

var tableHome = item.getManager().getTableHome();
var currentVersion = item.getManager().getCurrentVersion();


const tables = item.getTables().toArray();
logger.info('Tables Count: '+tables.length);

for (var i=0; i<tables.length; i++) {
	const table = tables[i];
	const tableType = table.getTableType()
	logger.info('tableType ' + tableType);
	//const tableType = tableHome.getTableTypeByID(tableTypeID)

	logger.info('item: '+item);
	logger.info('tableType: '+tableType);
	logger.info('version: '+currentVersion);
	const format = new java.lang.String("HTML3");
	logger.info('format: '+format);
	
	const xml = tableHome.getResolvedSTEPXMLFor(item, tableType, currentVersion, format, false)

	logger.info('xml: '+xml)
}
}