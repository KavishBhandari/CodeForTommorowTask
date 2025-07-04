const commonHelper = require("../../helper/commonHelper");
const dbHelper = require("../../helper/dbHelper");
const ApiError = require("../../utils/ApiError");
const { statusCode, messages } = require("../../utils/constant");
const responseHelper = require("../../helper/responseHelper");
const users = require("../../database/models/users");

const authMiddleware = async(req, res, next) => {
    try {
        const token = req.headers["authorization"];

        if(!token){
            throw new Error(statusCode.UNAUTHORIZED, messages.AUTHENTICATION_TOKEN_MISSING);
        }
        if(await commonHelper.isTokenExpires(token)){
            throw new Error(statusCode.BAD_REQUEST, messages.AUTHENTICATION_TOKEN_Expired);
        }

        const verificationRes = await commonHelper.verifySignature(token);

        const findUser = await dbHelper.getData(
            users,
            ["id", "name", "role", "email"],
            {where : { id : verificationRes.id}},
            true
        );

        if(!findUser)
            throw ApiError.customError(statusCode.UNAUTHORIZED, messages.UNAUTHORIZED_USER);

        req.user = findUser.dataValues;

        next();

    } catch (error) {
        return responseHelper.sendErrorRes(
            res,
            error.message ? error.message : messages.INTERNAL_SERVER_ERROR,
            statusCode.INTERNAL_SERVER_ERROR,
            {}
        )
    }
};
module.exports = authMiddleware;
