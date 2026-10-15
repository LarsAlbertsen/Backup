/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "StartExport2",
  "type" : "BusinessAction",
  "setupGroups" : [ "LAALBRGroup" ],
  "name" : "StartExport2",
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
/**
 * This script initiates a background process for a workflow task.
 * 
 * @file StartExport15759843965496356671.js
 */

const EXPORT_COUNT=100

// Retrieve the manager instance from the node
// @type {Manager}
var manager = node.getManager();

// Get the workflow instance by ID
// @type {Workflow}
var wf = manager.getWorkflowHome().getWorkflowByID("CreateItem");
logger.info("Got wf "+wf);
// Get the workflow instance from the node
// @type {WorkflowInstance}
var wfI = node.getWorkflowInstance(wf);
logger.info("Got wfI");
// Retrieve the tasks from the workflow instance
// @type {List<Task>}
var tasks = wfI.getTasks();
logger.info("Got tasks "+tasks);

// Get the first task from the tasks list
// @type {Task}
var task = tasks.iterator().next();
logger.info("Got task " + task);

// Create a new ExportServiceDescriptor and its parameters
// @type {ExportServiceDescriptor}
var serviceDescriptor = com.stibo.exportservices.descriptor.ExportServiceDescriptor;

// @type {ExportServiceDescriptor.Parameter}
var parameters = new com.stibo.exportservices.descriptor.ExportServiceDescriptor.Parameter();
parameters.configurationID = "32160505";

// Create a list of node URLs and add the current node's URL
// @type {ArrayList<String>}
var nodeUrlsList = new java.util.ArrayList();
nodeUrlsList.add(node.getURL());
parameters.nodeURLs = nodeUrlsList;

for (var i = 0; i < EXPORT_COUNT; i++) {
    if (i%10 ==0) {
        logger.info("Iteration: " + i);
    }
    // Start the background process for the task with the given service descriptor and parameters
    // @type {BackgroundProcess}
    var bgp = task.startBackgroundProcess(serviceDescriptor, parameters, "Started from WF");

    //logger.info("BGP " + bgp.getID());
}
logger.info("Done starting "+EXPORT_COUNT + " exports" );


}