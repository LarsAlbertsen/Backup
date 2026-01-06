/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRPDXTokenAuth",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRPDXTokenAuth",
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
  "functionParameterBinds" : [ ]
}
*/
exports.operation0 = function () {
logger.info("================== PDX Auth has been called ==================");
var clientID = "YourClientID";
var url = new java.net.URL("https://auth.pdx.stibosystems.com/auth/realms/pds/protocol/openid-connect/token");
 
/// Proxied token request
//var proxy = new java.net.Proxy(java.net.Proxy.Type.HTTP, new java.net.InetSocketAddress(java.net.InetAddress.getByName("proxy.host.name"), proxyPortNumber));
//var http = url.openConnection(proxy);
 
// non proxied token request
var http = url.openConnection();
logger.info("================== PDX Auth has been called ==================2"); 
http.setRequestMethod("POST");
logger.info("================== PDX Auth has been called ==================3");
http.setDoOutput(true);
logger.info("================== PDX Auth has been called ==================4");
http.setRequestProperty("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
http.connect();
var os = http.getOutputStream()
try {
       os.write(new java.lang.String("grant_type=client_credentials&client_id="+clientID+"&client_secret="+"pdxSecret").getBytes());
} finally {
   os.close();
}
var input= http.getInputStream();
try {
   var reader = new java.io.BufferedReader(new java.io.InputStreamReader(input));
   var string ="";
   while (reader.ready()){       
      string=string+reader.readLine();
   }
   var json = JSON.parse(string)
   var map = new java.util.HashMap();
   map.put("Authorization",json.token_type + " " + json.access_token);
   logger.info("Authorization "+json.token_type + " " + json.access_token);
     return map;
} finally {
   reader.close();
} 
}