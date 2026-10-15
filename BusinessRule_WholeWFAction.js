/*===== export metadata =====
{
  "contextId" : "Context1",
  "workspaceId" : "Approved"
}
*/
/*===== business rule definition =====
{
  "id" : "WholeWFAction",
  "type" : "BusinessAction",
  "setupGroups" : [ "AMFTest" ],
  "name" : "WholeWFAction",
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
    "contract" : "ManagerBindContract",
    "alias" : "manager",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "CurrentWorkflowBindContract",
    "alias" : "workflow",
    "parameterClass" : "null",
    "value" : null,
    "description" : null
  }, {
    "contract" : "TransitionEvaluationBindContract",
    "alias" : "transitionEvaluation",
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
exports.operation0 = function (node,manager,workflow,transitionEvaluation,logger) {
var nodeID = node.getID();
var userID = manager.getCurrentUser().getID();
var workflowID = workflow.getID();

var event = transitionEvaluation.getEvent();
var eventID = null;
if (event != null) {
   eventID = event.getID();
}

var transitionMessage = transitionEvaluation.getMessage();
var transitionRejected = transitionEvaluation.isRejected();
var resultMessages = transitionEvaluation.getResultMessages();

if (resultMessages.size() === 0) {
   var concatenatedResults = null;
} else {
   var concatenatedResults = "Evaluation Results (" + resultMessages.size() + "): ";
}

var resultMessageIter = resultMessages.iterator();
while (resultMessageIter.hasNext()) {
   concatenatedResults = concatenatedResults + resultMessageIter.next() + "; ";
}

var sourceState = transitionEvaluation.getSource();
var sourceStateID = null;
if (sourceState) {
   sourceStateID = sourceState.getID();
}

var targetState = transitionEvaluation.getTarget();
var targetStateID = null;
if (targetState) {
   targetStateID = targetState.getID();
}

var logTime = new Date().getTime();

// var auditObject = {
//    "_ID": "" + nodeID + "_" + workflowID,
//    ...
// }
var auditObject = {
   "nodeID": "" + nodeID,
   "workflowID": "" + workflowID,
   "userID": "" + userID,
   "logTime": logTime,
   "transition": {
      "eventID": "" + eventID,
      "submitMessage": "" + transitionMessage,
      "sourceStateID": "" + sourceStateID,
      "targetStateID": "" + targetStateID,
      "isRejected": transitionRejected,
      "rejectionMessages": "" + concatenatedResults
   }
};

var auditMessage = JSON.stringify(auditObject);            

logger.info(JSON.stringify(auditObject))
}