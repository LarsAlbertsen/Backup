/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "TestReflection",
  "type" : "BusinessAction",
  "setupGroups" : [ "TestBR" ],
  "name" : "TestReflection",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager) {
function getLovRoot(lovGroupId) {
    var lovHome = manager.getListOfValuesHome();
    var method = commons.getSetupMethodByNameParameter(lovHome.class, "getListOfValuesGroupByID", [java.lang.String]);
    return method.invoke(lovHome, lovGroupId);
}

function getLovValues(lovRoot) {
    var method = commons.getSetupMethodByNameParameter(lovRoot.class, "getChildren");
    return method.invoke(lovRoot);
}

function createLov(lovRoot, lovId) {
    var method = commons.getSetupMethodByNameParameter(lovRoot.class, "createListOfValues", [java.lang.String]);
    return method.invoke(lovRoot, lovId);
}

function createUnit(unitGroup, unitId) {
    var method = commons.getSetupMethodByNameParameter(unitGroup.class, "createUnit", [java.lang.String]);
    return method.invoke(unitGroup, unitId);
}

function createAttributeBuilder(attributeGroup) {
    var method = commons.getSetupMethodByNameParameter(manager.getAttributeHome().class, "createAttribute", [com.stibo.core.domain.AttributeGroup]);
    return method.invoke(manager.getAttributeHome(), attributeGroup);
}

lovRoot = getLovRoot("ArchivedLOVs");
createLOV(lovRoot, "New LOV");
}