/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "ELFRNameChildren",
  "type" : "BusinessAction",
  "setupGroups" : [ "ELFRBRGroup" ],
  "name" : "ELFRNameChildren",
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
  } ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function (node,logger) {
logger.info(node)


function generateNames(count) {
    const names = [];
    const length = 10;
    
    // Start with an array of 'A's
    let chars = Array(length).fill('A');

    for (let i = 0; i < count; i++) {
        names.push(chars.join(''));

        // Increment like a base-26 number
        for (let pos = length - 1; pos >= 0; pos--) {
            if (chars[pos] === 'Z') {
                chars[pos] = 'A'; // reset and carry over
            } else {
                chars[pos] = String.fromCharCode(chars[pos].charCodeAt(0) + 1);
                break; // no further carry needed
            }
        }
    }

    return names;
}

var names = generateNames(20100)

var cnt = 0;
node.queryChildren().forEach(function(child) {
	child.setName(names[cnt])
	logger.info(cnt + ' ' + names[cnt])
	cnt++
	return true;
})
logger.info(cnt)

}