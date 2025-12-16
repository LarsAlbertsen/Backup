/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRTest",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRTest",
  "description" : null,
  "scope" : "Global",
  "validObjectTypes" : [ "Operator user-type root" ],
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
    "contract" : "CurrentObjectBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
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
    "contract" : "BusinessFunctionBindContract",
    "alias" : "toAVRO",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>ELFRSerializeJsonToAVRO</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BusinessFunctionBindContract",
    "alias" : "toJSON",
    "parameterClass" : "com.stibo.core.domain.impl.businessrule.function.javascript.reference.BusinessFunctionReferenceImpl",
    "value" : "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<BusinessFunctionReference>\n  <BusinessFunction>ELFRDeserializeAVROtoJSON</BusinessFunction>\n</BusinessFunctionReference>\n",
    "description" : null
  }, {
    "contract" : "BarcodesBindContract",
    "alias" : "bc",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger,manager,toAVRO,toJSON,bc) {
var schema = {
  "type": "record",
  "name": "SimpleRecord",
  "fields": [
    {
      "name": "A",
      "type": "int"
    },
    {
    	name:"B", type:"string"
    },
    {
    	name:"C", type:"string"
    }
  ]
}

var data = {A : 123, B:"sdf", C:"This is a third value"}

var avroData  = toAVRO.evaluate({json:JSON.stringify(data), schema:JSON.stringify(schema)})

logger.info('avroData [' + avroData + ']');

var jsonString = toJSON.evaluate({avro:avroData, schema:JSON.stringify(schema)})
logger.info('json ' + jsonString)


var se = manager.getHome(com.stibo.core.domain.setupentity.SetupEntityHome).getSetupEntityByID('24050006')
logger.info(se.getObjectType())

logger.info(bc)
var asset = manager.getAssetHome().getAssetByID('BC')
logger.info(asset)
bc.generateQRcode(asset, 'This is a test of the value to put into the QR code', 300, 4, 1)

asset = manager.getAssetHome().getAssetByID('BC2')
logger.info(asset)
bc.generateQRcode(asset, 'This is a test of the value to put into the QR code', 100, 4, 1)


var headers = {"error":"Error while processing message [Topic: productsXML10, Partition: 2, Offset: 8378, MessageKey: BAProduct-1], Processing finished with errors","messages":["The value for attribute 'Number' on product 'BAProduct-1' isn't valid (Number validator failed: XfBcQWZ3iW) [Topic: productsXML10, Partition: 2, Offset: 8378, MessageKey: ]"]}
logger.info(headers.error.split(':')[4].split(']')[0].trim())
}