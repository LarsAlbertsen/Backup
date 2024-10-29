/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRSaveAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "WebUIRules" ],
  "name" : "ELFRSaveAction",
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
    "contract" : "HiddenContextBind",
    "alias" : "hidden",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "bbb",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "BBB",
    "description" : null
  }, {
    "contract" : "AttributeValidatedContextParameterStringBinding",
    "alias" : "aa",
    "parameterClass" : "com.stibo.core.domain.businessrule.attributecontextparameter.AttributeValidatedContextParameter",
    "value" : "<AttributeValidatedContextParameter>\n  <Parameters>\n    <Parameter ID=\"Attribute\" Type=\"java.lang.String\">ELFRDesc</Parameter>\n    <Parameter ID=\"ID\" Type=\"java.lang.String\">bb</Parameter>\n  </Parameters>\n</AttributeValidatedContextParameter>",
    "description" : null
  }, {
    "contract" : "WebUiContextBind",
    "alias" : "ui",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "SimpleValueBindContract",
    "alias" : "elfra",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ELFRA",
    "description" : null
  }, {
    "contract" : "DataIssuesContextBind",
    "alias" : "dir",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "AttributeBindContract",
    "alias" : "a",
    "parameterClass" : "com.stibo.core.domain.impl.AttributeImpl",
    "value" : "ELFRB",
    "description" : null
  } ],
  "messages" : [ {
    "variable" : "Message",
    "message" : "English message",
    "translations" : [ {
      "language" : "da",
      "message" : "Dansk besked"
    } ]
  }, {
    "variable" : "MessageLabel",
    "message" : "This is the label to use for a message",
    "translations" : [ {
      "language" : "da",
      "message" : "Dette er en overskrift til brug i en besked"
    } ]
  } ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,hidden,bbb,aa,ui,elfra,dir,a,Message,MessageLabel) {
function log(msg) {
	logger.info('ELFRSaveAction: ' + msg)
}

log(node)



//ui.showAlert('WARNING', new MessageLabel(), new Message())
//dir.addWarning(new MessageLabel(), node,a)
}