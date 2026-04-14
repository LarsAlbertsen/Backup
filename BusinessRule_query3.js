/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "query3",
  "type" : "BusinessAction",
  "setupGroups" : [ "AutoRules_Stibo" ],
  "name" : "query3",
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
exports.operation0 = function (manager,logger) {
// Bind - key: ManagerBindContract, alias: manager, parameterClass: null
//let manager;
// Bind - key: LoggerBindContract, alias: logger, parameterClass: null
//let logger;
 
/**
* Find and approve products below classification "AcmeProducts" under "Tools"
* where attribute ID="Color" equals "Red".
*/
 
// --- Setup Home constants for reuse ---
const CLASS_ACME_PRODUCTS = "AcmeSupplierProducts";
const CLASS_TOOLS = "106796";
const ATTR_COLOR = "ItemUniqueID";
const COLOR_VALUE = "Lars-4";
 
// --- Get necessary managers and objects ---
const classificationHome = manager.getClassificationHome();
const attributeHome = manager.getAttributeHome();
const queryHome = manager.getHome(com.stibo.query.home.QueryHome);
const Conditions = com.stibo.query.condition.Conditions;
 
// --- Resolve relevant classification and attribute objects ---
const acmeProductsClassification = classificationHome.getClassificationByID(CLASS_ACME_PRODUCTS);
const toolsClassification = classificationHome.getClassificationByID(CLASS_TOOLS);
const colorAttribute = attributeHome.getAttributeByID(ATTR_COLOR);
 
if (acmeProductsClassification == null) {
    throw "Classification 'AcmeProducts' not found";
}
if (toolsClassification == null) {
    throw "Classification 'Tools' not found";
}
if (colorAttribute == null) {
    throw "Attribute 'Color' not found";
}
 
// --- Build query conditions (all as named consts) ---
const isUnderAcmeProducts = Conditions.hierarchy().simpleBelow(acmeProductsClassification);
const isUnderTools = Conditions.hierarchy().simpleBelow(toolsClassification);
const isColorRed = Conditions.valueOf(colorAttribute).eq(COLOR_VALUE);
 
// Combine: Product is under BOTH AcmeProducts AND Tools, and has Color=Red.
const combinedCondition = isUnderAcmeProducts
    .and(isUnderTools)
    .and(isColorRed);
 
// --- Query for matching Products ---
queryHome.queryFor(com.stibo.core.domain.Product)
    .where(combinedCondition)
    .forEach(function(product) {
        // --- Prepare to approve only Color attribute value ---
        // Gather non-approved objects for Color
        const nonApprovedObjects = product.getNonApprovedObjects();
        const iterator = nonApprovedObjects.iterator();
        const partsToApprove = new java.util.HashSet();
 
        while (iterator.hasNext()) {
            const part = iterator.next();
            // Approve only ValuePartObjects for Color attribute
            if (
                part.getClass().getName().equals("com.stibo.core.domain.partobject.ValuePartObject") &&
                ATTR_COLOR.equals(part.getAttributeID())
            ) {
                partsToApprove.add(part);
            }
        }
 
        // Approve only if any Color parts are pending
        if (!partsToApprove.isEmpty()) {
            product.approve(partsToApprove);
            logger.info("Approved 'Color' for Product ID: " + product.getID());
        }
        return true; // required to keep forEach going
    });
 
}