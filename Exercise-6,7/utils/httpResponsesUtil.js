const { RESPONSE_MESSAGES, RETURNED_VALUES } = require("../config/constants");
httpUnauthorizedResponse = (msg = "", data = 0) => {
    return {
        status: 401,
        message: msg,
        data: data
    };
}

httpNotModifiedResponse = (msg = "", data = 0) => {
    return {
        status: 401,
        message: msg,
        data: data
    };
}

httpSuccessResponse = (msg = "", data = 0) => {
    return {
        status: 200,
        message: msg,
        data: data
    };
}

httpNotFoundResponse = (msg="") => {
    return {
        status: 404,
        message: msg,
        data: data
    };
}

httpNoDataFoundResponse = () => {
    const resobj = {
        success: RETURNED_VALUES.FALSE,
        code: "NO_RECORDS",
        message: RESPONSE_MESSAGES.NO_RECORDS_MSG
    }
    return {
        status: 500,
        message:resobj
    };
}

httpErrorResponse = () => {
    const resobj = {
        success: RETURNED_VALUES.FALSE,
        code: "ERROR_MSG",
        message: RESPONSE_MESSAGES.ERROR_MSG
    }
    return {
        status: 500,
        message:resobj
    };
}

module.exports = {
    httpErrorResponse: httpErrorResponse,
    httpNotModifiedResponse: httpNotModifiedResponse,
    httpUnauthorizedResponse: httpUnauthorizedResponse,
    httpNotFoundResponse: httpNotFoundResponse,
    httpSuccessResponse: httpSuccessResponse,
    httpNoDataFoundResponse: httpNoDataFoundResponse
}