/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "SearchFunction",
  "type" : "BusinessFunction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "SearchFunction",
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
  "pluginId" : "QueryBusinessFunction",
  "parameters" : [ {
    "id" : "FunctionParameterBinds",
    "type" : "com.stibo.core.domain.businessrule.function.parameter.FunctionParameterBindMap",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<FunctionParameterBindMap>\n  <Bind contractID=\"NodeBindContract\" Alias=\"currentnode\" Description=\"\" ParameterClass=\"null\"/>\n  <Bind contractID=\"StringBindContract\" Alias=\"searchstring\" Description=\"\" ParameterClass=\"null\"/>\n</FunctionParameterBindMap>\n"
  }, {
    "id" : "QueryVariables",
    "type" : "com.stibo.queryfunction.domain.plugin.parameter.QueryVariablesMap",
    "value" : "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPFF1ZXJ5VmFyaWFibGVzLz4K"
  }, {
    "id" : "SearchParameter",
    "type" : "com.stibo.queryfunction.domain.plugin.parameter.SearchParameter",
    "value" : "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPENyaXRlcmlhR3JvdXAgQ3JpdGVyaWFHcm91cE9wZXJhdG9yPSJhbmQiPgogIDxDcml0ZXJpb24gdHlwZT0iSElFUkFSQ0hZIj4KICAgIDxIaWVyYXJjaHlDcml0ZXJpYT4KICAgICAgPEhpZXJhcmNoeUNyaXRlcmlvbiBOb2RlSWQ9IjIxNTAyOSIgTm9kZVR5cGU9InByb2R1Y3QiLz4KICAgIDwvSGllcmFyY2h5Q3JpdGVyaWE+CiAgPC9Dcml0ZXJpb24+CiAgPENyaXRlcmlvbiB0eXBlPSJOQU1FIj4KICAgIDxOYW1lQ3JpdGVyaWE+CiAgICAgIDxOYW1lQ3JpdGVyaW9uIFZhcmlhYmxlTmFtZT0ic2VhcmNoc3RyaW5nIiBOYW1lT3BlcmF0b3I9Ikxpa2UiIE5hbWVPcGVyYXRvckluZGV4PSIzIi8+CiAgICA8L05hbWVDcml0ZXJpYT4KICA8L0NyaXRlcmlvbj4KPC9Dcml0ZXJpYUdyb3VwPgo="
  } ],
  "pluginType" : "Operation"
}
*/
