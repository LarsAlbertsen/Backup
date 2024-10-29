/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LovCrossA",
  "type" : "BusinessCondition",
  "setupGroups" : [ "ELFRConditions" ],
  "name" : "LovCrossA",
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
    "value" : "<map>\n  <entry>\n    <key LOVID=\"ELFRLov\">114823</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLov\">114823</element>\n        <element LOVID=\"ELFRLov\">114825</element>\n        <element LOVID=\"ELFRLov\">114826</element>\n        <element LOVID=\"ELFRLov\">114827</element>\n        <element LOVID=\"ELFRLov\">111</element>\n        <element LOVID=\"ELFRLov\">114822</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ELFRLov\">114825</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLov\">114823</element>\n        <element LOVID=\"ELFRLov\">114825</element>\n        <element LOVID=\"ELFRLov\">218343</element>\n        <element LOVID=\"ELFRLov\">114826</element>\n        <element LOVID=\"ELFRLov\">114827</element>\n        <element LOVID=\"ELFRLov\">114822</element>\n        <element LOVID=\"ELFRLov\">111</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ELFRLov\">218343</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLov\">114823</element>\n        <element LOVID=\"ELFRLov\">114825</element>\n        <element LOVID=\"ELFRLov\">218343</element>\n        <element LOVID=\"ELFRLov\">114826</element>\n        <element LOVID=\"ELFRLov\">114827</element>\n        <element LOVID=\"ELFRLov\">114822</element>\n        <element LOVID=\"ELFRLov\">111</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ELFRLov\">114826</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLov\">114822</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ELFRLov\">114827</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLov\">114823</element>\n        <element LOVID=\"ELFRLov\">114825</element>\n        <element LOVID=\"ELFRLov\">218343</element>\n        <element LOVID=\"ELFRLov\">114826</element>\n        <element LOVID=\"ELFRLov\">114827</element>\n        <element LOVID=\"ELFRLov\">114822</element>\n        <element LOVID=\"ELFRLov\">111</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ELFRLov\">114822</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLov\">218343</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ELFRLov\">111</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLov\">218343</element>\n        <element LOVID=\"ELFRLov\">114822</element>\n      </set>\n    </value>\n  </entry>\n</map>"
  }, {
    "id" : "DefiningAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "ELFRA"
  }, {
    "id" : "DependentAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "ELFRB"
  } ],
  "pluginType" : "Operation"
}
*/
