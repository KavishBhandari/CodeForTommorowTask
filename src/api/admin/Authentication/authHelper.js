const dbHelper = require("../../../helper/dbHelper");
const ApiError = require("../../../utils/ApiError");
const { statusCode, messages } = require("../../../utils/constant");
const model = require("../../../database/models");

class AuthHelper {
  checkValidUser = async (email) => {
    const getValidUser = await dbHelper.getData(
      model.users,
      ["email", "id", "password", "role"],
      { where: { email } },
      true
    );
    if (!getValidUser) {
      throw ApiError.customError(statusCode.BAD_REQUEST, messages.INVALID_CREDENTIALS);
    }
    return getValidUser;
  };
};
module.exports = new AuthHelper();