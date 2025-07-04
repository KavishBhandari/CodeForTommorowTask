const messages = {
    INTERNAL_SERVER_ERROR: "INTERNAL SERVER ERROR",
    UNAUTHORIZED_USER: "Your Account does not exist with this email",
    CATEGORY_CREATED_SUCCESS: "Category added successfully.",
    CATEGORY_UPDATED_SUCCESS: "Category updated successfully.",
    CATEGORY_FETCHED_SUCCESS: "Category fetched successfully.",
    CATEGORY_DELETED_SUCCESS: "Category removed successfully.",
    AUTHENTICATION_TOKEN_MISSING: "Your authentication token is missing",
    AUTHENTICATION_TOKEN_Expired : "JWT Token is expired.",
    CATEGORY_SERVICES_DELETED_SUCCESS: "category services deleted successfully",
    CATEGORY_NOT_FOUND: "category not found",
    CATEGORY_SERVICES_UPDATED_SUCCESS: "Category services updated successfully.",
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    USER_SIGNIN_SUCCESS: "User signin successs"
};

const statusCode = {
    success: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500,
};

module.exports = { messages, statusCode }