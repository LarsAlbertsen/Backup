/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRPubSubTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRPubSubTest",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (logger,gw) {
var post = gw.post()

function b64(str) {
	var encoder = java.util.Base64.getEncoder();
	var bytes = new java.lang.String(str).getBytes("UTF-8");
	var encoded = encoder.encodeToString(bytes);
	return encoded;
}

var msg = {
	messages: [{data: b64('hello')},{data: b64('hello')},{data: b64('hello')},{data: b64('hello')},{data: b64('hello')},{data: b64('hello')},{data: b64('hello')}]
}






var res = post.header('Authorization', 'Bearer ya29.c.c0ASRK0GbkXCWFG5LbfDwfSyriUOxKsO5P-47t14zwlIyh4zPB9pw5Md5DriOq8zvQ8PaTpqVC2M83hH6mjFvb5FRN0PHBrZDbAqdnj1c8c5tTgWxgvh9BmePmaSx1mZd3it6QP_APy8pCTj2MyeE7TNxdICO3uX1ASOZ-M6jRu17bxqgJYlt0VU_SvouJ5a_DlF6hDuhQof9uJWOBjCAH1w-NWaKlBDuSGO-TNFrf6Hbk-olJ-ADKwj9Zvq_S43blacndxSAalfcFkb-CqArO8WM8PcFP6rpo-podNrHHzVowY6OKLnuTY47LBBkPpN7hM2ng6jEQhFrKWzrL8ZcEWcFLLNADsXzsDz_r3K4G613pZOOVjLd4xnqYawH387KuUnmcsOJ12qkkdoFrhRocautXoZ-ZV5Vobkx583936hgSpJporlk1MJuYn2lqX-Icwdlz1gtOg8ectlzfgouVJm7464wQW8mYS6pet--1_Jjq22r2ptoOw3SVimZbp806wzOuzbcjFBF2i8dff1U88xudmWej5wwFeejRs986O-Wpvp_xuk4zB35s4JhiZ7w8IQgjSO92_Wq-4VB1l-XVzZcl1vdsVBkar0vnn3nbuRbJIt0OzxrgZBRgZm5Sx4-3xQyhvrsxBMYZM4yoW-rfoBYtdkm6tceoeqdgV81MB-cZq-Xin64glBigacWzUIhx7xty8ZXVyRciwrOon8Q_YykQorZ52h8bw3az8s_m_ugolbc7Mls-W8utziv4gVqu4-I54bOUUY_SgF8qobjzrsXnRx_v_I034w5MxQ4olg49sXp7fup_uJsrS6b2gMzhyXtzw8g0v4rX7zmy8pwUov-mlczwrI_JU7JWF9c4s9tOnWxaWJxt4hfRW7wa4JevdQUit5lX0RRd1yYvkoY94yMj_4erRlzjgZ2k_SFI8gvxtzZjFh1kYWx1ho_7z49x2xlR0XkSZ9ul8V7zdfeyy75tnUrxmiyzFoVo7z8Rt87wvtat4XVlFUa')
	.header('Content-Type', 'application/json')
	.body(JSON.stringify(msg)).invoke()

logger.info(res)

}