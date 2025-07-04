class ResponseHelper {
    sendSuccessRes = (res, message, statusCode=200, data={}) => {
        return res.status(statusCode).send({
            success: true,
            message,
            data 
        });
    };

    sendErrorRes = (res, message, statusCode=500, data={}) => {
        return res.status(statusCode).send({
            success: false,
            message,
            data
        });
    };
};
module.exports = new ResponseHelper();