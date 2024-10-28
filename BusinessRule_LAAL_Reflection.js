/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LAAL_Reflection",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "LAAL_Reflection",
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
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node) {
for (var j=0; j<5; j++) {
	var allValues = node.getValues().toArray();
	for (var i=0; i<allValues.length; i++) {
		/** @type{Value} */
		var aValue = allValues[i];
		var attribute = aValue.getAttribute();
		if (attribute.getValidForObjectTypes().contains(node.getObjectType())) {
			//logger.info("Attr "+attribute.getTitle());
			if (!isUsedByUniqueKey(attribute)) {
				var validatorName = getValidatorName(attribute);
				if (attribute.getListOfValues()!=null) {
					logger.info("skipLOV "+attribute.getTitle());
				}
				else if ("text".equals(validatorName)) {
					logger.info("setTEXT "+attribute.getTitle());
					node.setSimpleValue(attribute, "Lars-"+j);
					if (aValue instanceof com.stibo.core.domain.impl.value.FrontCompactSoftSingleValueImpl) {
						//logger.info(aValue.getClass().getName())
						logger.info(node.getValue(attribute.getID()).getRawValue())
					}
				}
				else if ("number".equals(validatorName) || "numeric_text".equals(validatorName)) {
					logger.info("setNUMBER "+attribute.getTitle()+ "=" +j);
					//node.setSimpleValue(attribute, ""+j);
				}
				else {
					logger.warning("UNKNOWN "+validatorName);
				}
			}
		}
	}
	logger.info("Calling approve")
	node.approve();
}

function getValidatorName(pAttr) {
	var method = pAttr.getClass().getMethod("getValidatorName");
	//logger.info("Got Method");
	var oo = method.invoke(pAttr);
	return oo;
}

function isUsedByUniqueKey(pAttr) {
	var method = pAttr.getClass().getMethod("isUsedByUniqueKey");
	var oo = method.invoke(pAttr);
	//logger.info("Got isUsedByUniqueKeyod "+oo);
	if ("false".equals(oo)) {
		return false;
	}
	else {
		return true;
	}
}


}