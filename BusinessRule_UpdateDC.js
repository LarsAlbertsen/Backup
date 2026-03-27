/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "UpdateDC",
  "type" : "BusinessAction",
  "setupGroups" : [ "AutoRules" ],
  "name" : "UpdateDC",
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

/* Business Action: Update LAALDC Attribute Value
 * @summary Finds products with data container type LAALDC where LAALDC_Attr_1='ABC' 
 *          and updates the value to 'ABCD'
 * @pattern Based on sligro best practice (ba_ExportWorkflowAuditCreateArticle#0.js)
 */

const DATA_CONTAINER_TYPE_ID = "LAALDC";
const ATTRIBUTE_ID = "LAALDC_Attr_1";
const SEARCH_VALUE = "ABC";
const NEW_VALUE = "ABCD";


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


const c = com.stibo.query.condition.Conditions;
const queryHome = manager.getHome(com.stibo.query.home.QueryHome);


const dataContainerCondition = c.hasDataContainer(dataContainerType)
    .where(c.valueOf(attribute).eq(SEARCH_VALUE));

const querySpecification = queryHome
    .queryFor(com.stibo.core.domain.Product)
    .where(dataContainerCondition);

const result = querySpecification.execute();

/*
// Process results
let count = 0;
result.forEach(function(product) {
    logger.info("Found product: " + product.getID() + " - " + product.getName());
    count++;
    return true;
});

logger.info("Total products found with " + DATA_CONTAINER_TYPE_ID + " containing '" + SEARCH_VALUE + "': " + count);
*/


let updateCount = 0;

result.forEach(function(product) {
    product.getDataContainer(dataContainerType).getDataContainers().forEach(function(dataContainer) {
        logger.info("Processing product: " + product.getID() + " - " + product.getName());
        const dcObject = dataContainer.getDataContainerObject();
        const currentValue = dcObject.getValue(ATTRIBUTE_ID).getSimpleValue();
        logger.info("Current value of " + ATTRIBUTE_ID + ": '" + currentValue + "' Searching for '" + SEARCH_VALUE + "' ");
        
        if (currentValue === SEARCH_VALUE) {
            dcObject.getValue(ATTRIBUTE_ID).setSimpleValue(NEW_VALUE);
            updateCount++;
            logger.info("Updated product " + product.getID() + " DC value from '" + SEARCH_VALUE + "' to '" + NEW_VALUE + "'");
        }
        return true;
    });
    return true;
});

logger.info("Total data containers updated: " + updateCount);

}