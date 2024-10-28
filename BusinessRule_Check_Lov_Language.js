/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "Check_Lov_Language",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "Check_Lov_Language",
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
    "contract" : "ListOfValuesBindContract",
    "alias" : "lov",
    "parameterClass" : "com.stibo.core.domain.impl.ListOfValuesImpl",
    "value" : "Color",
    "description" : null
  }, {
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
exports.operation0 = function (lov,manager) {


logger.info("logger "+logger.getClass().getName())
logger.info("lov "+lov.getClass().getName())

manager.getContextHome().getContexts().forEach(function(context) {
    //logger.info("Context "+context)

    manager.executeInContext(context.getID(), function(contextManager) {
        /** @type{Manager} */
        var m = contextManager
	    logger.info("in "+m.getCurrentContext().getTitle());
        /** @type{ListOfValues} */
        var lovInContext = m.getObjectFromOtherManager(lov)
        
        //logger.info("lovInContext "+lovInContext)
        var values = lovInContext.queryValidValues().forEach(function(vv) {
            /** @type{ListOfValuesValue} */
            var vvv = vv;
            logger.info("vv = "+vvv.getValue()+" isLanguageInherited "+ vvv.isLanguageInherited())
            return true
        });
 
    });

})
}