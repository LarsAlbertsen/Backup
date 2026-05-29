/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRAutoClass",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRAutoClass",
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
  "pluginId" : "AutoClassificationBusinessActionPlugin",
  "parameters" : [ {
    "id" : "AutoClassificationLinkType",
    "type" : "com.stibo.core.domain.LinkType",
    "value" : null
  }, {
    "id" : "EvaluationContext",
    "type" : "com.stibo.core.domain.Context",
    "value" : "Context1"
  }, {
    "id" : "RuleSet",
    "type" : "com.stibo.core.domain.Asset",
    "value" : "ELFRAutoClass"
  }, {
    "id" : "UseApprovedRuleSet",
    "type" : "java.lang.Boolean",
    "value" : "true"
  } ],
  "pluginType" : "Operation"
}
*/
