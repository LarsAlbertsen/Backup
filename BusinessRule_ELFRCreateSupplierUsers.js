/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRCreateSupplierUsers",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRCreateSupplierUsers",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "GatewayBinding",
    "alias" : "gw",
    "parameterClass" : "com.stibo.core.domain.impl.integrationendpoint.gateway.FrontGatewayIntegrationEndpointImpl",
    "value" : "SELF",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,gw) {

function createUser(id, supplierid) {
	var put = gw.put();
	put.path('restapiv2/users/'+supplierid + '-User' + id)
	put.pathQuery({context:'Context1', workspace:'Main', "allow-overwrite":"true"})
	put.header('Content-Type','application/json')
	put.header('Accept', '*/*')
	var body = {"name":supplierid + '-User' + id,"userGroups" : [supplierid]}
	logger.info(JSON.stringify(body))
	put.body(JSON.stringify(body))
	var res = put.invokeWithDetails()
	logger.info(res.getStatusCode())
}

for (var i = 1; i<1000; i++) {
	createUser(i, 'ShareSearch')
//	createUser(i, 'SupplierA')
//	createUser(i, 'SupplierB')
//	createUser(i, 'SupplierC')
//	createUser(i, 'SupplierD')
//	createUser(i, 'SupplierE')
//	createUser(i, 'SupplierF')
//	createUser(i, 'SupplierG')
//	createUser(i, 'SupplierH')
//	createUser(i, 'SupplierI')
//	createUser(i, 'SupplierJ')
}

	

}