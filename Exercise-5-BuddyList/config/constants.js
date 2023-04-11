const RESPONSE_MESSAGES = {
   BUDDY_CREATED_MSG: "Buddy List Detail succesfully created",
   BUDDY_UPDATED_MSG: "Buddy List Details successfully updated",
   BUDDY_DELETED_MSG: "Buddy List Detail is deleted. Can't fetch by deleted id",
   BUDDY_FOUND_MSG: "Requested Buddy List Details is succesfully fetched", 
    NOT_FOUND_MSG: "Requested Data can't be fetched/posted in JSON",
    ERROR_MSG: "Caught in an error",
    NO_RECORDS_MSG: "No records found Buddy List-management json file",
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