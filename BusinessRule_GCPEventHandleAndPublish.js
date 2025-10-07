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


var res = post.header('Authorization', 'Bearer ya29.c.c0ASRK0GaQmh6jxws9rIjhS-yZqviw23i23ezPZb2IzuZPjdb4s-as1OlOH7IiGwZJSh2_WoSUrzFqGKRSBX1QCWuFVLGrUET1zPGtp-F9CFTdbumVujrkZFwb2ozYDc3phlmI2K10lbcKzccLTM9qwxc-fiA7WvsYbP4HtoVaX1S6cCBmM3-20biVjIMSsbZ-i4jUNIretgjFtf9Rqu8m7xQaL8hw5_BkvIzUuYKka2D_ek3yFttEJw1J1aS4oiUuTo3Ek5OjcbMNONkl95NzUgW67SpjXuVSeHYAgXk-qj8CrsEjk8cPXVFhw4psWsWbVmGJ0AYhpGGi_TTJpdJTUHsCpxGzWDX439Yc8dgLiHNwzcO44yF5wZZNDAG387AwasQpZ8Vgpo5pnX2rgyhywhzS0a9fuptVI08BYR2yimpUwb6BY2s5j-5jd00phSZxdQVpM2gxjYeWVcenj3Ym8zewRB6lQe8Xfa6besbiyao9_njpqybopuevgiv_y2fwtmBd3IlpyiffiSpnh3Q29dz5OaQXYXghrlv7Yh1aIv_r03WXF6h2_IOWSqylsR3exi3pxeus4r40n-Bnxol5SZtpVFI3My_79rBlMeUV5waBx_5aVze83R69OcxsJpnellgg1nlt7ek_Y-kmS2dYBJyUXrdRru_2RbVrXFYp-l323p2JIRfdJaJcqUi69f_sY9jJFcz_McupB_ak5mh5jWmdgr9n7I-SiV81Z-cv9_Z6okQU2S6qIOfmObw0f_gZZo3VFOSyeidZvaW79_B0Ycwbzt1Y-kSexfZ0Rgx0meahMiUmXwSpcff8o4a_33absBpRasidQ61tm6WuUW_ZOdzZSjhnwYXMmbl6Z9-igSMuO-Z94hwYrZv0SlRWOM_9jZFk4jepX573-vxvxIV05UIztWnm0OvQjMa-58qqBuvx0jswm2VV3m-Bl04eUoOvlrF4evf6I6W2mXj28w7SF12Bba9qFl-XgzJ8V8tF-iq1ecI18a_-Qlb')
	.header('Content-Type', 'application/json')
	.body(JSON.stringify(payload)).invoke()

logger.info(res)

}