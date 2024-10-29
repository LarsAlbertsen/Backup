/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "QueryExample",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRRules" ],
  "name" : "QueryExample",
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
    "contract" : "LoggerBindContract",
    "alias" : "logger",
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
    "contract" : "QueryHomeBindContract",
    "alias" : "qHome",
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
exports.operation0 = function (logger,manager,qHome,node) {
function log(msg) {
	logger.info(msg)
}
//############################## Main ##############################

/*
function handle(child) {
	log(child)
	return true
}
node.queryChildren().forEach(handle)
*/
function dateTest() {
	var a = manager.getAttributeHome().getAttributeByID('StartDate');
	//var a = manager.getAttributeHome().getAttributeByID('StartDateTime');
	
	var c = com.stibo.query.condition.Conditions;
	var querySpecification = qHome.queryFor(com.stibo.core.domain.Product).where(
		c.valueOf(a).date().lteq('2023-06-21')
		.and(c.id().eq('40016617'))
	);
	var result = querySpecification.execute();
	result.forEach(function(x) {
		log(x + ' ' + x.getValue(a.getID()).getSimpleValue())
		return true;	
	})
}

function dcTest() {
	var c = com.stibo.query.condition.Conditions
	var tc = com.stibo.query.condition.Conditions
	var attr = manager.getAttributeHome().getAttributeByID('ELFRDesc')
	var reftype = manager.getReferenceTypeHome().getReferenceTypeByID('PtoP')
	
	var cond1 = c.id().eq('203327')
	var cond2 = c.hasReference(reftype).where(c.targetMatches(c.valueOf(attr).eq('12')))
	var cond3 = c.hasReference(reftype).where(c.valueOf(attr).eq('xx'))
	
	var qs = qHome.queryFor(com.stibo.core.domain.Product).where(
		cond3
	);
	var result = qs.execute();
	result.forEach(function(x) {
		log(x)
		return true;	
	})

}

function dcTestAnd() {
	var dcTypeHome = manager.getHome(com.stibo.core.domain.datacontainertype.DataContainerTypeHome);
	var dcType = dcTypeHome.getDataContainerTypeByID("ELFRDC");

	var attr1 = manager.getAttributeHome().getAttributeByID('ELFRDesc')
	var attr2 = manager.getAttributeHome().getAttributeByID('ElfrDescAttr')

	var c = com.stibo.query.condition.Conditions

	var dcCond = c.hasDataContainer(dcType).where(
		c.valueOf(attr1).eq("B")
		.and(c.valueOf(attr2).eq("B"))
	);
	var querySpecification = qHome.queryFor(com.stibo.core.domain.Product).where(dcCond);
	var query = querySpecification.execute();
    
	query.forEach(function(node) {
		logger.info("Title "+node.getTitle());
		return true;
	});
}

function noValue() {
	var root = manager.getProductHome().getProductByID('40016520');
	var attr = manager.getAttributeHome().getAttributeByID('ELFRNumber2');
	var c = com.stibo.query.condition.Conditions;
	var cond = c.hierarchy().simpleBelow(root)
		.and(c.valueOf(attr).eq('1111')
			.or(c.valueOf(attr).like('*').except(c.valueOf(attr).exists()))
		)
		//.except(c.valueOf(attr).exists())
	var query = qHome.queryFor(com.stibo.core.domain.Product)
		.where(cond).execute();

	query.forEach(function(n){
		logger.info(n.getTitle() + ' ' + attr.getID() + '='+n.getValue(attr.getID()).getSimpleValue())
		return true;
	})
	
}

function referenceSearch() {
	var c = com.stibo.query.condition.Conditions;
	var attr = manager.getAttributeHome().getAttributeByID('DisplaySequence')
	var reftype = manager.getReferenceTypeHome().getReferenceTypeByID('PtoP')
	var md = manager.getAttributeHome().getAttributeByID('MarketingDescription2')
	//40993640

	var qs = qHome.queryFor(com.stibo.core.domain.Product)
			//.where(c.hasReference(reftype).inherited().where(c.valueOf(attr).like('*')));
			.where(c.hasReference(reftype).inherited()
				.where(c.valueOf(attr).eq('2')
					.and(c.targetMatches(c.valueOf(md).inherited().eq('md2')))));

	var result = qs.execute();
	result.forEach(function(x) {
		log(x)
		return true;	
	})
}
function refBySearch() {
	var c = com.stibo.query.condition.Conditions;
	var attr = manager.getAttributeHome().getAttributeByID('DisplaySequence')
	var md = manager.getAttributeHome().getAttributeByID('MarketingDescription1')
	var reftype = manager.getReferenceTypeHome().getReferenceTypeByID('PtoP')
	var source = manager.getProductHome().getProductByID('40016617')
	source = manager.getProductHome().getProductByID('40993640')

	var qs = qHome.queryFor(com.stibo.core.domain.Product)
			.where(c.isReferenced(reftype).where(c.valueOf(attr).numeric().gteq('1001')
			.and(c.sourceMatches(c.valueOf(md).eq('ABC')))
			));
			//.where(c.isReferenced(reftype).where(c.valueOf(attr).eq('1').and(c.sourceIs(source))));
			//.where(c.isReferenced(reftype).where(c.sourceIs(source)));

	var result = qs.execute();
	result.forEach(function(x) {
		log(x + ' has an incomming reference of type ' + reftype.getID())
		return true;	
	})	
}

function userSearch() {
	var c = com.stibo.query.condition.Conditions;
	var a = manager.getAttributeHome().getAttributeByID('Purpose')
	log(a)
	var qs = qHome.queryFor(com.stibo.core.domain.User)
			.where(c.valueOf(a).eq('ABC'));
			//.where(c.isReferenced(reftype).where(c.valueOf(attr).eq('1').and(c.sourceIs(source))));
			//.where(c.isReferenced(reftype).where(c.sourceIs(source)));

	var result = qs.execute();
	result.forEach(function(x) {
		log(x)
		return true;	
	})	
}
function searchForRef() {
	log('searchForRef')
	var c = com.stibo.query.condition.Conditions;
	var attr = manager.getAttributeHome().getAttributeByID('ElfrDescAttr')
	var reftype = manager.getReferenceTypeHome().getReferenceTypeByID('ItemToItem')

	var qs = qHome.queryFor(com.stibo.core.domain.Reference)
			//.where(c.hasReference(reftype).inherited().where(c.valueOf(attr).like('*')));
			.where(c.valueOf(attr).like('*'));

	var result = qs.execute();
	result.forEach(function(x) {
		log(x)
		return true;	
	})
}

searchForRef()
//userSearch()
//referenceSearch()
//refBySearch()
//dateTest()
//dcTestAnd()



}