/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LovCrossB",
  "type" : "BusinessCondition",
  "setupGroups" : [ "ELFRConditions" ],
  "name" : "LovCrossB",
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
    "value" : "<map>\n  <entry>\n    <key LOVID=\"ELFRLov\">114823</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLovWithID\">99</element>\n        <element LOVID=\"ELFRLovWithID\">10</element>\n        <element LOVID=\"ELFRLovWithID\">5</element>\n        <element LOVID=\"ELFRLovWithID\">4</element>\n        <element LOVID=\"ELFRLovWithID\">1</element>\n        <element LOVID=\"ELFRLovWithID\">3</element>\n        <element LOVID=\"ELFRLovWithID\">20</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ELFRLov\">218343</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLovWithID\">99</element>\n        <element LOVID=\"ELFRLovWithID\">10</element>\n        <element LOVID=\"ELFRLovWithID\">5</element>\n        <element LOVID=\"ELFRLovWithID\">4</element>\n        <element LOVID=\"ELFRLovWithID\">1</element>\n        <element LOVID=\"ELFRLovWithID\">3</element>\n        <element LOVID=\"ELFRLovWithID\">20</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ELFRLov\">114825</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLovWithID\">99</element>\n        <element LOVID=\"ELFRLovWithID\">10</element>\n        <element LOVID=\"ELFRLovWithID\">5</element>\n        <element LOVID=\"ELFRLovWithID\">4</element>\n        <element LOVID=\"ELFRLovWithID\">1</element>\n        <element LOVID=\"ELFRLovWithID\">3</element>\n        <element LOVID=\"ELFRLovWithID\">20</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ELFRLov\">114826</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLovWithID\">99</element>\n        <element LOVID=\"ELFRLovWithID\">10</element>\n        <element LOVID=\"ELFRLovWithID\">5</element>\n        <element LOVID=\"ELFRLovWithID\">4</element>\n        <element LOVID=\"ELFRLovWithID\">1</element>\n        <element LOVID=\"ELFRLovWithID\">3</element>\n        <element LOVID=\"ELFRLovWithID\">20</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ELFRLov\">114827</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLovWithID\">99</element>\n        <element LOVID=\"ELFRLovWithID\">10</element>\n        <element LOVID=\"ELFRLovWithID\">5</element>\n        <element LOVID=\"ELFRLovWithID\">4</element>\n        <element LOVID=\"ELFRLovWithID\">1</element>\n        <element LOVID=\"ELFRLovWithID\">3</element>\n        <element LOVID=\"ELFRLovWithID\">20</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ELFRLov\">111</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLovWithID\">1</element>\n      </set>\n    </value>\n  </entry>\n  <entry>\n    <key LOVID=\"ELFRLov\">114822</key>\n    <value>\n      <set>\n        <element LOVID=\"ELFRLovWithID\">99</element>\n        <element LOVID=\"ELFRLovWithID\">10</element>\n        <element LOVID=\"ELFRLovWithID\">5</element>\n        <element LOVID=\"ELFRLovWithID\">4</element>\n        <element LOVID=\"ELFRLovWithID\">1</element>\n        <element LOVID=\"ELFRLovWithID\">3</element>\n        <element LOVID=\"ELFRLovWithID\">20</element>\n      </set>\n    </value>\n  </entry>\n</map>"
  }, {
    "id" : "DefiningAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "ELFRA"
  }, {
    "id" : "DependentAttribute",
    "type" : "com.stibo.core.domain.Attribute",
    "value" : "ELFRLovAttrWithID"
  } ],
  "pluginType" : "Operation"
}
*/
