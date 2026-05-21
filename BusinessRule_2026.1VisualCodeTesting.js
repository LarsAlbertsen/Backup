/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "2026.1VisualCodeTesting",
  "type" : "BusinessAction",
  "setupGroups" : [ "2026.1Testing" ],
  "name" : "2026.1 Testing in Visual Code",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Item", "Variant" ],
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
    "alias" : "obj",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "ManagerBindContract",
    "alias" : "manager",
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
    "contract" : "ClassificationProductLinkTypeBindContract",
    "alias" : "classificationType",
    "parameterClass" : "com.stibo.core.domain.impl.ClassificationProductLinkTypeImpl",
    "value" : "Display",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (obj,manager,logger,classificationType) {
// Business Rule Type: BusinessAction
// Bind - key: CurrentObjectBindContract, alias: node, parameterClass: null
let node;

const attributeGroupHome = node.getManager().getAttributeGroupHome();
const textsAttributeGroup = attributeGroupHome.getAttributeGroupByID("Texts");

if (textsAttributeGroup == null) {
	throw new java.lang.IllegalArgumentException("Attribute group 'Texts' was not found.");
}

const textsAttributeGroupID = textsAttributeGroup.getID() + "";
const values = node.getValues();
const valueIterator = values.iterator();

while (valueIterator.hasNext()) {
	const value = valueIterator.next();
	const attribute = value.getAttribute();

	if (!isInAttributeGroup(attribute, textsAttributeGroupID)) {
		continue;
	}

	const simpleValue = value.getSimpleValue();
	if (simpleValue == null) {
		continue;
	}

	const attributeID = attribute.getID() + "";
	log.info(attributeID + ": " + (simpleValue + ""));
}

function isInAttributeGroup(attribute, targetGroupID) {
	const attributeGroups = attribute.getAttributeGroups();
	const groupIterator = attributeGroups.iterator();

	while (groupIterator.hasNext()) {
		let currentGroup = groupIterator.next();
		while (currentGroup != null) {
			const currentGroupID = currentGroup.getID() + "";
			if (targetGroupID === currentGroupID) {
				return true;
			}
			currentGroup = currentGroup.getParent();
		}
	}

	return false;
}

}