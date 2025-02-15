/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "RS_Lib",
  "type" : "BusinessLibrary",
  "setupGroups" : [ "LAALRules" ],
  "name" : "RS_Lib",
  "description" : null,
  "scope" : null,
  "validObjectTypes" : [ ],
  "allObjectTypesValid" : false,
  "runPrivileged" : false,
  "onApprove" : null,
  "dependencies" : [ ]
}
*/
/*===== business rule plugin definition =====
{
  "pluginId" : "JavaScriptBusinessLibrary",
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/

/*-Completion
@trigger:		STEPUtils.getClassEnum()
@annotation:	STEPUtils.getClassEnum()
@detail:		
-*/
function getClassEnum(){
	return {
		"Classification": 					com.stibo.core.domain.Classification,
		"Product":        					com.stibo.core.domain.Product,
		"Asset":          					com.stibo.core.domain.Asset,
		"Gateway":                              com.stibo.core.domain.integrationendpoint.gateway.GatewayIntegrationEndpoint,
		"SingleAttributeQuerySpecification":    com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome.SingleAttributeQuerySpecification,
		"SingleAttributeQueryHome":			com.stibo.core.domain.singleattributequery.SingleAttributeQueryHome,
		"ApproveRecursiveServiceDescriptor":	com.stibo.services.base.approverecursive.ApproveRecursiveServiceDescriptor,
		"ValuePartObject":					com.stibo.core.domain.partobject.ValuePartObject,
		"QueryHome":						com.stibo.query.home.QueryHome,
		"DimensionPointHome":				com.stibo.core.domain.DimensionPointHome,
		"DimensionHome":		   			com.stibo.core.domain.DimensionHome,
		"BusinessRuleHome":					com.stibo.core.domain.businessrule.BusinessRuleHome,
		"DataContainerTypeHome":                com.stibo.core.domain.datacontainertype.DataContainerTypeHome,
		"Node":                                 com.stibo.core.domain.Node,
		"Task":                                 com.stibo.core.domain.state.Task,
		"EventQueue":                           com.stibo.core.domain.eventqueue.EventQueue,
		"Entity":							com.stibo.core.domain.entity.Entity,
		"AttributeGroup":                       com.stibo.core.domain.AttributeGroup,
		"UserGroup":						com.stibo.core.domain.Group,
		"LinkType":						com.stibo.core.domain.LinkType,
		"ReferenceType":					com.stibo.core.domain.ReferenceType,
		"Unit":							com.stibo.core.domain.Unit,
		"ListOfValues":					com.stibo.core.domain.ListOfValues,
		"ListOfValuesValue":				com.stibo.core.domain.ListOfValuesValue,
		"Attribute":						com.stibo.core.domain.Attribute
	};
}

/*-Completion
@trigger:		STEPUtils.getJavaClassByName(className)
@annotation:	STEPUtils.getJavaClassByName(className)
@detail:		
-*/
function getJavaClassByName(className){
	return getClassEnum()[className];
}



/*-Completion
@trigger:		STEPUtils.getAttribute(node)
@annotation:	STEPUtils.getAttribute(node)
@detail:		
-*/
function getAttribute(node){
	return node.getAttribute();
}


/*-Completion
@trigger:		STEPUtils.getCallableGetAttribute()
@annotation:	STEPUtils.getCallableGetAttribute()
@detail:		
-*/
function getCallableGetAttribute(){
	return getAttribute;
}

/*-Completion
@trigger:		STEPUtils.hasMethod(node, methodName)
@annotation:	STEPUtils.hasMethod(node, methodName)
@detail:		
-*/
function hasMethod(node, methodName){	
	return getMethodNames(node).includes(methodName);
}

/*-Completion
@trigger:		STEPUtils.getMethodNames(node)
@annotation:	STEPUtils.getMethodNames(node)
@detail:		
-*/
function getMethodNames(node){
	return getMethodsFromClass(node.class).map(function(method){
		return method.getName()+"";
	});
}

/*-Completion
@trigger:		STEPUtils.getMethodsFromClass(classPath)
@annotation:	STEPUtils.getMethodsFromClass(classPath)
@detail:		
-*/
function getMethodsFromClass(classPath){
	var methods = [];
	for(var i in classPath.getMethods()){
		methods.push(classPath.getMethods()[i]);
	}
	return methods;
}

/*===== business library exports - this part will not be imported to STEP =====*/
exports.getClassEnum = getClassEnum
exports.getJavaClassByName = getJavaClassByName
exports.getAttribute = getAttribute
exports.getCallableGetAttribute = getCallableGetAttribute
exports.hasMethod = hasMethod
exports.getMethodNames = getMethodNames
exports.getMethodsFromClass = getMethodsFromClass