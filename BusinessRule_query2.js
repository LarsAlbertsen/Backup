/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "query2",
  "type" : "BusinessAction",
  "setupGroups" : [ "AutoRules_Stibo" ],
  "name" : "query2",
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
    "contract" : "QueryHomeBindContract",
    "alias" : "queryHome",
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
    "contract" : "MailHomeBindContract",
    "alias" : "mailHome",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (queryHome,manager,mailHome) {
// Business Rule: Find and process products for workflow/email
// Bind - key: QueryHomeBindContract, alias: queryHome, parameterClass: null
//let queryHome;
// Bind - key: ManagerBindContract, alias: manager, parameterClass: null
//let manager;
// Bind - key: MailHomeBindContract, alias: mailHome, parameterClass: null
//let mailHome;

// --------------------------------------------------------------------
// Parameters
const productTypeID = "Item";
const classificationID = "AcmeSupplierProducts";
const belowProductID = "106447";
const dataContainerTypeID = "LAALDC";
const dataContainerAttrID = "LAALDC_Attr_1";
const dataContainerAttrValue = "ABC"; // Change as needed
const workflowID = "CreateItem";
const notificationEmail = "laal@stibosystems.com";

// --------------------------------------------------------------------
// STEP API requirement: Get needed objects/types
const c = com.stibo.query.condition.Conditions;

// Lookups of types/nodes by ID upfront
const productObjType = manager.getObjectTypeHome().getObjectTypeByID(productTypeID);
const classificationNode = manager.getClassificationHome().getClassificationByID(classificationID);
const belowProductNode = manager.getProductHome().getProductByID(belowProductID);
const dcType = manager.getHome(com.stibo.core.domain.datacontainertype.DataContainerTypeHome).getDataContainerTypeByID(dataContainerTypeID);
const dcAttr = manager.getAttributeHome().getAttributeByID(dataContainerAttrID);
const workflow = manager.getWorkflowHome().getWorkflowByID(workflowID);

// --------------------------------------------------------------------
// Query Conditions: Extract each to a named const (per rules)

const isProductObjType = c.objectType(productObjType);

// Query for hierarchy (below classification AND below product node)
const isBelowClassification = c.hierarchy().simpleBelow(classificationNode);
const isBelowProduct = c.hierarchy().simpleBelow(belowProductNode);

// Data container condition: has DCType, where DCAttr equals required value
const hasDcWithAttrMatch = c.hasDataContainer(dcType)
    .where(c.valueOf(dcAttr).eq(dataContainerAttrValue));

// Combine all conditions using .and()
const allConditions =
    isProductObjType
        .and(isBelowClassification)
        .and(isBelowProduct)
        .and(hasDcWithAttrMatch);

// --------------------------------------------------------------------
// Query and process

let workflowStartedProducts = [];

queryHome
    .queryFor(com.stibo.core.domain.Product)
    .where(allConditions).execute()
    .forEach(function(product) {
        // Start the workflow for each product, if not already present
        if (!product.isInWorkflow(workflowID)) {
            workflow.start(product, "Workflow started by business rule.");
            workflowStartedProducts.push(product.getID());
        }
        // Continue iterating
        return true;
    });

// --------------------------------------------------------------------
// Send email notification if any workflow started

if (workflowStartedProducts.length > 0) {
    let mail = mailHome.mail();
    mail.addTo(notificationEmail);
    mail.subject("Workflow 'modify' started for products");
    let html = 
        "<p>The workflow 'modify' has been started for the following product(s):</p><ul>";
    for (let i = 0; i < workflowStartedProducts.length; i++) {
        html += "<li>" + workflowStartedProducts[i] + "</li>";
    }
    html += "</ul>";

    mail.htmlMessage(html);
    mail.send();
}
}