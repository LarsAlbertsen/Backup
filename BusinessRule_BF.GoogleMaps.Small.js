/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "BF.GoogleMaps.Small",
  "type" : "BusinessFunction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "BF.GoogleMaps.Small",
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
  "binds" : [ ],
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
exports.operation0 = function (node) {
/*var html = '<div style="margin-top:16px;line-height: 28px;background-color: #e6e6e6;padding-left:12px;font-family:-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, Helvetica, PingFang SC, Meiryo UI, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;font-size: 14px;font-weight: bold">Maps</div>';
var la;
var lo;
var dc = null; // node.getDataContainerByTypeID('MainAddressDataContainer').getDataContainerObject();
if (dc){
	la = dc.getValue('Latitude').getSimpleValue();
	lo = dc.getValue('Longitude').getSimpleValue();
}	
la = 33.9064296;
lo = -84.471954;

//var url = 'https://localhost:8888/maps?q=' + la + ',' + lo + '&t=&z=15&ie=UTF8&iwloc=&output=embed';
var url = 'https://maps.google.com/maps?q=' + la + ',' + lo + '&t=&z=15&ie=UTF8&iwloc=&output=embed';

if (lo && la){
	html = html += '<iframe src="' + url + '" style="border:none;width:100%;height:300px"/>';
} else
{
	html = html += '<div style="vertical-align:top;padding-top:0px;padding-left:12px;"><table cellspacing="0" cellpadding="0"><tbody><tr><td align="left" style="padding-top:14px;vertical-align:top;width:12px;">•</td><td align="left" style="padding-top:14px;vertical-align:top;color:rgba(0,0,0,0.87)">Please validate the adress first</td></tr></table></div>';
}
return html;
*/

var html = "<iframe width=\"400\" height=\"200\" src=\"http://prism.stibo.dk\"></iframe>";
return html;

}