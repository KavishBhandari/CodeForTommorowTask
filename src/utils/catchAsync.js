const responseHelper = require("../helper/responseHelper");
const { messages, statusCode } = require("./constant");

const catchAsync = (fn) => {
  return async (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then(async () => {
        req.transaction && (await req.transaction.commit());
      })
      .catch(async (error) => {
        console.log("catchAsyncs error :::::::::::", error)
        req.transaction && (await req.transaction.rollback());
        return responseHelper.sendErrorRes(
          res,
          error.message ? error.message : messages.INTERNAL_SERVER_ERROR,
          statusCode.INTERNAL_SERVER_ERROR,
          {}
        );
      });
  };
};

module.exports = catchAsync;
