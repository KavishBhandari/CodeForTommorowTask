class ApiError {
    customError(statusCode, ErrorMessage) {
        const errorRes = {
            statusCode: statusCode,
            message: ErrorMessage
        };
        return errorRes;
    }
}
module.exports = new ApiError();