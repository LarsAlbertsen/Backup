/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "GenerateCombinations",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALRules" ],
  "name" : "GenerateCombinations",
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
  "binds" : [ ],
  "messages" : [ ],
  "pluginType" : "Operation"
}
*/
exports.operation0 = function () {

var arg = new java.util.HashMap()
arg.put(1,getList(0))
arg.put(10,getList(10))

var result = generateCombinations(arg, 5)
logger.info(result);



function generateCombinations(map, expectedResultSize) {
    var keys = map.keySet().toArray();
    var result = new java.util.ArrayList(expectedResultSize);
    
    //failsafe if no keys in the map
    if (keys.length === 0) {
        return result;
    }
    
    var stack = new java.util.Stack();
    stack.push(new java.util.AbstractMap.SimpleEntry(new java.lang.Integer(0), new java.util.ArrayList(keys.length)));

    while (!stack.isEmpty()) {
        var currentEntry = stack.pop();
        logger.info("currentEntry: "+currentEntry.getKey());
        var index = new java.lang.Integer(currentEntry.getKey());
        logger.info("index="+index);
        var currentCombination = currentEntry.getValue();
        if (index == keys.length) {
            result.add(new java.util.ArrayList(currentCombination));
            continue;
        }
        var key = keys[index];
        var values = map.get(key);
        for (var i = 0; i < values.size(); i++) {
            var newCombination = new java.util.ArrayList(currentCombination);
            newCombination.add(values.get(i));
            //logger.info("index "+index.getClass().getName() + " value="+index)

            stack.push(new java.util.AbstractMap.SimpleEntry(index + 1, newCombination));
           //stack.push(new java.util.AbstractMap.SimpleEntry(new java.lang.Integer(index + 1), newCombination));
           logger.info("stack: "+stack);

        }
    }
    return result;
}


function getList(start) {
	var l = new java.util.ArrayList();
	l.add(start+0);
	l.add(start+1);
	l.add(start+2);
	return l
}


}