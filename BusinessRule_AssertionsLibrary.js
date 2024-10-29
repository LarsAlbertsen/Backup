/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "AssertionsLibrary",
  "type" : "BusinessLibrary",
  "setupGroups" : [ "Testing" ],
  "name" : "Assertions Library",
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
function NotNull(n,msg) {
	if (!n) {
		throw msg
	}
}

function Equals(a,b, assertLabel) {
	if (a != b) {
		throw (assertLabel?assertLabel + ': ':'') + a + ' != ' + b
	}
}

function HasRef(sourceNode, targetNode, type, assertLabel) {
	var refType = sourceNode.getManager().getReferenceTypeHome().getReferenceTypeByID(type)
	NotNull(refType, 'Unable to find referencetype ' + type)
	var found = false
	sourceNode.queryReferences(refType).forEach(function(ref) {
		found = ref.getTarget().equals(targetNode)
		return !found
	})
	if (!found) throw (assertLabel?assertLabel + ': ':'') +'Cannot find ref of type ' + type + ' from ' + sourceNode.getTitle() + ' to ' + targetNode.getTitle()
}


function HasParent(childNode, parentNode, assertLabel) {
	if (!childNode.getParent().equals(parentNode)) {
		throw (assertLabel?assertLabel+': ':'') + childNode + ' must be child of ' + parentNode
	}
}

/*===== business library exports - this part will not be imported to STEP =====*/
exports.NotNull = NotNull
exports.Equals = Equals
exports.HasRef = HasRef
exports.HasParent = HasParent