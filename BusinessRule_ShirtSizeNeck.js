/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ShirtSizeNeck",
  "type" : "BusinessCondition",
  "setupGroups" : [ "ELFRConditions" ],
  "name" : "ShirtSizeNeck",
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
  "pluginId" : "LOVCrossValidationBusinessCondition",
  "parameters" : [ {
    "id" : "Config",
    "type" : "com.stibo.core.domain.parameter.LOVCrossValidationConfig",
    "value" : "<map>\n  <entry>\n    <key LOVID=\"ShirtSize\">3</key>\n    <value>\n      <set>\n        <element LOVID=\"ShirtNeck\">R</element>\n        <element LOVID=\"ShirtNeck\">T</element>\n        <element LOVID=\"ShirtNeck\">C</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ShirtSize\">4</key>\n    <value>\n      <set>\n        <element LOVID=\"ShirtNeck\">T</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ShirtSize\">2</key>\n    <value>\n      <set>\n        <element LOVID=\"ShirtNeck\">R</element>\n        <element LOVID=\"ShirtNeck\">T</element>\n        <element LOVID=\"ShirtNeck\">C</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ShirtSize\">1</key>\n    <value>\n      <set>\n        <element LOVID=\"ShirtNeck\">C</element>\n      </set>\n    </value>\n  </entry>\n</map>"
  }, {
    "id" : "DefiningAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "ShirtSize"
  }, {
    "id" : "DependentAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "ShirtNeck"
  } ],
  "pluginType" : "Operation"
}
*/
