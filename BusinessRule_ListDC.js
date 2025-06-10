/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ListDC",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "ListDC",
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
  "pluginId" : "JavaScriptBusinessActionWithBinds",
  "binds" : [ {
    "contract" : "CurrentObjectBindContract",
    "alias" : "item",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (item) {

item.getDataContainers().forEach(function (arg) {
    /** @type{DataContainer} */
    var dataContainer = arg;



    logger.info("Data Container: " + dataContainer);

    if (dataContainer instanceof com.stibo.core.domain.impl.datacontainer.FrontSingleDataContainerImpl) {
    		/** @type{SingleDataContainer} */
            const singleDC = dataContainer;
        logger.info("Single")
        const dcObj = singleDC.getDataContainerObject();
        logger.info('dcObj '+dcObj)

        var attr = item.getManager().getAttributeHome().getAttributeByID('LAALDC_Attr_1')
		const value = dcObj.getValue("LAALDC_Attr_1")
        
        //var inlineRefs = value.class.getMethod("getInlineReferences").invoke(value);
        var inlineRefs = value.getInlineReferences()
        logger.info('inlineRefs '+inlineRefs)
    }
    else if (dataContainer instanceof com.stibo.core.domain.impl.datacontainer.FrontMultiDataContainerImpl) {
        logger.info("Multi");
    }
    else {
    		logger.info('Unknown '+dataContainer)
    }

});


}