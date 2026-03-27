/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "FindDC",
  "type" : "BusinessAction",
  "setupGroups" : [ "AutoRules" ],
  "name" : "FindDC",
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

const DATA_CONTAINER_TYPE_ID = "LAALDC";
const ATTRIBUTE_ID = "LAALDC_Attr_1"; // Replace with actual attribute ID in the data container
const SEARCH_VALUE = "ABC";

// Get references to the data container type and attribute
const dataContainerTypeHome = manager.getHome(com.stibo.core.domain.datacontainertype.DataContainerTypeHome);
const dataContainerType = dataContainerTypeHome.getDataContainerTypeByID(DATA_CONTAINER_TYPE_ID);

if (dataContainerType == null) {
    logger.info("Data container type '" + DATA_CONTAINER_TYPE_ID + "' not found");
    return;
}

const attribute = manager.getAttributeHome().getAttributeByID(ATTRIBUTE_ID);
if (attribute == null) {
    logger.info("Attribute '" + ATTRIBUTE_ID + "' not found");
    return;
}

// Build query using Conditions API
const queryHome = manager.getHome(com.stibo.query.home.QueryHome);
const c = com.stibo.query.condition.Conditions;

// Build data container condition: find products with LAALDC containing value 'ABC'
const dataContainerCondition = c.hasDataContainer(dataContainerType)
    .where(c.valueOf(attribute).eq(SEARCH_VALUE));

// Execute query for Products
const querySpecification = queryHome
    .queryFor(com.stibo.core.domain.Product)
    .where(dataContainerCondition);

const result = querySpecification.execute();

// Process results
let count = 0;
result.forEach(function(product) {
    logger.info("Found product: " + product.getID() + " - " + product.getName());
    count++;
    return true;
});

logger.info("Total products found with " + DATA_CONTAINER_TYPE_ID + " containing '" + SEARCH_VALUE + "': " + count);

}