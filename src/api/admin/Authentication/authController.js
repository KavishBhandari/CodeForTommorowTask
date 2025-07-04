const commonHelper = require("../../../helper/commonHelper");
const responseHelper = require("../../../helper/responseHelper");
const catchAsync = require("../../../utils/catchAsync");
const { messages, statusCode } = require("../../../utils/constant");
const authHelper = require("./authHelper");

const signInController = catchAsync(async (req, res, next) => {
    const user = await authHelper.checkValidUser(req.body.email);
    await commonHelper.verifyPassword(req.body.password, user.password);
    user.dataValues.token = await commonHelper.generateSignatue({
        id: user.id,
        email: user.email,
        role_id: user.role_id
    });
    return responseHelper.sendSuccessRes(res, messages.USER_SIGNIN_SUCCESS, statusCode.success, user);
});
// test

module.exports = signInController;