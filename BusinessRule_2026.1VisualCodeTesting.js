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
    "alias" : "node",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,manager,logger) {
/**
 * Create a short description of the current product from its attribute values,
 * then print it to the logger.
 *
 * Bindings:
 * - Current Object: node
 * - Logger: logger
 */




const productId = String(node.getID());
const productName = String(node.getName());

const valueParts = [];
const maxValuesInDescription = 4;
const valueIterator = node.getValues().iterator();

while (valueIterator.hasNext() && valueParts.length < maxValuesInDescription) {
    const value = valueIterator.next();
    const simpleValue = value.getSimpleValue();
    logger.info("Attribute " + String(value.getAttribute().getID()) + " has value: " + String(simpleValue));
    if (simpleValue != null && String(simpleValue).length > 0) {
        const attributeId = String(value.getAttribute().getID());
        valueParts.push(attributeId + "=" + String(simpleValue));
    }
}

const attributeSummary = valueParts.length > 0 ? valueParts.join(", ") : "no attribute values";
const description = "Product " + productName + " (" + productId + "): " + attributeSummary;

logger.info(description);

}