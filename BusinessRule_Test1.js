/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Test1",
  "type" : "BusinessAction",
  "setupGroups" : [ "AutoRules" ],
  "name" : "Test1",
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (manager,node) {
/**
 * Business Action: Set FirstApprovalDate
 * 
 * This action sets the "FirstApprovalDate" attribute to the current date
 * if the product has not been approved before (i.e., the FirstApprovalDate is null).
 * 
 * Following copilot instructions:
 * - Uses const/let instead of var
 * - Uses proper string comparison for STIBO values with + ""
 * - Checks for null values before setting
 * - Uses setSimpleValue() for setting attribute values
 */

const logger = step.getLogger();

try {
    // Get current date in ISO format (YYYY-MM-DD)
    const currentDate = new Date();
    const isoDate = currentDate.toISOString().slice(0, 10);
    
    logger.info("Starting FirstApprovalDate business action for node: " + node.getID());
    
    // Check if the product has an existing FirstApprovalDate
    const existingFirstApprovalDate = node.getValue("FirstApprovalDate").getSimpleValue();
    
    // Only set FirstApprovalDate if it's currently null (product not approved before)
    if (existingFirstApprovalDate == null) {
        // Set FirstApprovalDate to current date
        node.getValue("FirstApprovalDate").setSimpleValue(isoDate);
        
        logger.info("FirstApprovalDate set to: " + isoDate + " for product: " + node.getID());
        logger.info("Product approval status: " + node.getApprovalStatus().toString() + "");
    } else {
        logger.info("FirstApprovalDate already exists (" + existingFirstApprovalDate + ") for product: " + node.getID() + ", no action taken");
    }
    
} catch (error) {
    logger.error("Error in FirstApprovalDate business action: " + error.message);
    
    // Re-throw the error for proper error handling
    throw error;
}

}