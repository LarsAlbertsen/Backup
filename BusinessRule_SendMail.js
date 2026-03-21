/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "SendMail",
  "type" : "BusinessAction",
  "setupGroups" : [ "Actions" ],
  "name" : "SendMail",
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
  "pluginId" : "SendEmailBusinessAction",
  "parameters" : [ {
    "id" : "Body",
    "type" : "java.lang.String",
    "value" : "test"
  }, {
    "id" : "Recipients",
    "type" : "java.util.List",
    "values" : [ "@mjan@stibosystems.com" ]
  }, {
    "id" : "Sender",
    "type" : "com.stibo.util.basictypes.EmailRecipient",
    "value" : "@noreply@stibosystems.com"
  }, {
    "id" : "Subject",
    "type" : "java.lang.String",
    "value" : "test"
  } ],
  "pluginType" : "Operation"
}
*/
