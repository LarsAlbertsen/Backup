/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "br_WritePerformanceTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "MJAN_BR_Group" ],
  "name" : "br_WritePerformanceTest",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "LoggerBindContract",
    "alias" : "log",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (log) {
var sdf = new java.text.SimpleDateFormat("yyyy-MM-dd_hh:mm:ss.SSS");
var date = new Date();
var timeStamp = sdf.format(date);
log.info("Start: " + timeStamp);

var LINES_TO_WRITE = 1000;
var file = new java.io.File("/shared//upload/server-side-delivery/WritePerformance.txt");
//var file = new java.io.File("/tmp/WritePerformance.txt");

for (i=0;i<LINES_TO_WRITE;i++){
  var fw = new java.io.FileWriter(file,true);
  var bw = new java.io.BufferedWriter(fw);
  
  var sMessage = "This is a test line\n";
  bw.write(sMessage);
  bw.close();
}

var dateEnd = new Date();
var timeStampEnd = sdf.format(dateEnd);

log.info("End: " + timeStampEnd);
log.info("Diff ("+LINES_TO_WRITE+"): " + diffInMilliSecounds(date, dateEnd) + " ms" );

function diffInMilliSecounds(dt1, dt2) {
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate(), dt2.getHours(), dt2.getMinutes(), dt2.getSeconds(), dt2.getMilliseconds()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate(), dt1.getHours(), dt1.getMinutes(), dt1.getSeconds(), dt1.getMilliseconds()) ) /(1));
}
//file.renameTo(new java.io.File("/shared//upload/server-side-delivery/WritePerformance.txt"));
file.delete();
}