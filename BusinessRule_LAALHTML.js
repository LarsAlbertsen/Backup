/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "LAALHTML",
  "type" : "BusinessFunction",
  "setupGroups" : [ "LAALFunctions" ],
  "name" : "LAALHTML",
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
  "pluginId" : "JavaScriptBusinessFunctionWithBinds",
  "binds" : [ {
    "contract" : "AIAgentBindContract",
    "alias" : "Agent",
    "parameterClass" : "com.stibo.ai.engine.runtime.domain.agent.Agent",
    "value" : "6a445042-b2a1-4cca-bb1d-bb11ba7866f8",
    "description" : null
  } ],
  "messages" : [ ],
  "pluginType" : "Operation",
  "functionReturnType" : "java.lang.String",
  "functionParameterBinds" : [ {
    "contract" : "NodeBindContract",
    "alias" : "node",
    "parameterClass" : "null",
    "value" : null,
    "description" : ""
  } ]
}
*/
exports.operation0 = function (Agent,node) {
const nodeID = node.getID();
logger.info("NodeID "+nodeID);


const attributes = [];

const allValues = node.getValues().toArray();
logger.info("All Values: "+allValues);

for (let i = 0; i < allValues.length; i++) {
	let sv = allValues[i].getSimpleValue();
    logger.info("Value " + i + ": " + sv + "  " + allValues[i].getSimpleValue());
    
}



logger.info("allValues length: " + allValues.length);
for (let i = 0; i < allValues.length; i++) {
    let value = allValues[i];
    let simpleValue = value.getSimpleValue();
    //logger.info(""+i+" " + value.getAttribute().getName() + " Value: "+simpleValue);
    if (simpleValue != null && String(simpleValue) !== "") {
        let attribute = value.getAttribute();
        attributes.push({
            id: attribute.getID() + "",
            name: attribute.getName() + "",
            value: simpleValue + ""
        });
    }
}

const jsonValue = JSON.stringify({
    id: nodeID + "",
    name: node.getName() + "",
    attributes: attributes
});
logger.info("JSON "+JSON.stringify(jsonValue));

const html = Agent.run(jsonValue);

let fixedHtml = String(html);

const prefix = "```html";
if (fixedHtml.indexOf(prefix) === 0) {
    fixedHtml = fixedHtml.substring(prefix.length);
}

const suffix = "```";
if (fixedHtml.lastIndexOf(suffix) === fixedHtml.length - suffix.length) {
    fixedHtml = fixedHtml.substring(0, fixedHtml.length - suffix.length);
}

return fixedHtml;

}