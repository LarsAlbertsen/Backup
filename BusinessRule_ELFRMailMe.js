/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRMailMe",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRMailMe",
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
  "pluginId" : "SendEmailBusinessAction",
  "parameters" : [ {
    "id" : "Body",
    "type" : "java.lang.String",
    "value" : "Message body from plugin"
  }, {
    "id" : "Recipients",
    "type" : "java.util.List",
    "values" : [ "@ELFR@stibosystems.com" ]
  }, {
    "id" : "Sender",
    "type" : "com.stibo.util.basictypes.EmailRecipient",
    "value" : "@ELFRMailMe@stibosystems.com"
  }, {
    "id" : "Subject",
    "type" : "java.lang.String",
    "value" : "ScheduleBulkUpdTest"
  } ],
  "pluginType" : "Operation"
}
*/
