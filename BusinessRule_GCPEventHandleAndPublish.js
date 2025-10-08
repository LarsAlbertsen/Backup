/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "GCPEventHandleAndPublish",
  "type" : "BusinessAction",
  "setupGroups" : [ "GCPPublish" ],
  "name" : "GCPEventHandleAndPublish",
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "GatewayBinding",
    "alias" : "gw",
    "parameterClass" : "com.stibo.core.domain.impl.integrationendpoint.gateway.FrontGatewayIntegrationEndpointImpl",
    "value" : "PubSubTest",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "ATG",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>AccessTokenGetter</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "EventProcessorEventBatchBindContract",
    "alias" : "batch",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,gw,ATG,batch) {
var post = gw.post()

function b64(str) {
	var encoder = java.util.Base64.getEncoder();
	var bytes = new java.lang.String(str).getBytes("UTF-8");
	var encoded = encoder.encodeToString(bytes);
	return encoded;
}


var payload = {
	messages: [] //{data: b64('hello')}
}


batch.getEvents().forEach(function(e) {
	var msg = {id:e.getNode().getID(), name:e.getNode().getTitle()}
	payload.messages.push({data:b64(JSON.stringify(msg))})
	return true;
})


var res = post.header('Authorization', 'Bearer ya29.c.c0ASRK0GZvi0Vl0H_1nOAuXBxOpXPpyb9HLs8rAcNQnoKINsQpNNFwVMwB5avZ-00YEPp92cKdZE5V4WL1KYo6VpHl6UlQ9gk8F1Bf836o2joJ5R4nUqHCqiseK2XhMCRdDe7kX7ao81viMiVa2a0FEISGgFDVyVTL2SeI-eb1qaq9cNcHtbC_D_RZaLojpap0Xras13h0vsqiMsoQxEEqtNWBK471n927Pxj4DMht_1QyXcVn2VP2jm5VKCtnB_ZzZqdahu-DpzwUDSD9nD5Ytd49F94hhBPDUcDlRTbERyL3wH1Wr_3edHf89_YRnyWtl1jJTprHjOkHnJIcHMlB6Sp9SbDKDexlyaq0qhTMPKvcBUpCIK0YtrXXBwG387AkuI4Q_rbzgoFt782auwXcyijfyBpSXzRVlmU6df8qcU1pkWzdlp3RaOY_e6psg_Bi5Rhexl4_uJaq00Jbc2cxqSVOMXOYf_3cwb_1SZVS7v5xs0ci05zy07c9oZhyB-2F-IW2etMthzUwsc8xVd7-g8X3tflU4dxrVRgb6_gORUbtxR0SyWjRvfVxj7RqIur7mJaWOUuOZZ0iFXQxx5ef6a6e8sot01koq7Rg2F8e2631imWYw9j9kUox-v67Bh_6a90ROJ2q-Bs-vmR81M8oxOhn0SBnXObd2X9R2293bzchM6p2l1Jq9lQYeSMjvohIojVJfQbQ2QkUOg41gY5rax_n2hBoUxfwkhxs3eWp3-37O9m4dXegkIsFW0vMlOcJbM4ZbW312nF92bub2Qeq7Sn1b3l7q3Fdfmv9zwBdQdiIRmYImufSn7uIu6V0qcyYQhsOUWVQV53nQ5o9XI3kS-U8gX5u9hcIsi1-xcp_W7_33sVO-WYkznh5voBceo0u8Rm4x6jbWO0Rj4SrrJgsQ7o32RoYvSkX6mja4uj8glyk-eO1eUUiRO1kSSjSbhx4izh-M-fVF97Xxu2tg-03bWBxeMmOwoi29Zodi7xZS4X95YOj6x4afo9')
	.header('Content-Type', 'application/json')
	.body(JSON.stringify(payload)).invoke()

logger.info(res)

}