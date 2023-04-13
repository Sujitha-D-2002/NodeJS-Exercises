const RESPONSE_MESSAGES = {
    TASK_CREATED_MSG: "Task Detail succesfully created",
    TASK_UPDATED_MSG: "Task Details successfully updated",
    TASK_DELETED_MSG: "Task Detail is deleted. Can't fetch by deleted id",
    TASK_FOUND_MSG: "Requested Task Details is succesfully fetched", 
    NOT_FOUND_MSG: "Requested Data can't be fetched/posted in JSON",
    ERROR_MSG: "Caught in an error",
    NO_RECORDS_MSG: "No records found task-management json file",
    NULL_VALUES_MSG: "Request Body has Null Values",
    SUCCESS_MSG: "Successfully Fetched the data",
    DATA_INSUFFICIENT:"Insufficient data"
}
const RETURNED_VALUES = {
    TRUE: true,
    FALSE: false,
    UNDEFINED: undefined,
    NULL: null
}

module.exports = {
    RESPONSE_MESSAGES: RESPONSE_MESSAGES,
    RETURNED_VALUES: RETURNED_VALUES
}