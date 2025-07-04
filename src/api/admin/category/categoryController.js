const { sequelize } = require("../../../database/models/index");
const responseHelper = require("../../../helper/responseHelper");
const catchAsync = require("../../../utils/catchAsync");
const { messages, statusCode } = require("../../../utils/constant");
const categoryHelper = require("./categoryHelper");
class Category {
    addCategory = catchAsync(async (req, res) => {
        req.transaction = await sequelize.transaction();
        const category_creation = await categoryHelper.addCategory(req.body, req.transaction);
        const categroryServiceCreatation =  await categoryHelper.addCategroryService(category_creation.id, req.body.category_service, req.transaction);
        await categoryHelper.addCategroryServicePrice(categroryServiceCreatation.id, req.body.categoryServicePrice, req.transaction);
        return responseHelper.sendSuccessRes(res, messages.CATEGORY_CREATED_SUCCESS, statusCode.success, category_creation, );
    });
    updateCategory = catchAsync(async (req, res) => {
        req.transaction = await sequelize.transaction();
        const category_update = await categoryHelper.updateCategory(req.body, req.transaction);
        return responseHelper.sendSuccessRes(res, messages.CATEGORY_UPDATED_SUCCESS, statusCode.success, category_update);
    });
    deleteCategory = catchAsync(async (req, res) => {
        req.transaction = await sequelize.transaction();
        await categoryHelper.deleteCategory(req.params.id, req.transaction);
        return responseHelper.sendSuccessRes(res, messages.CATEGORY_DELETED_SUCCESS, statusCode.success, {});
    });
    getCategory = catchAsync(async (req, res) => {
        const category_fetched = await categoryHelper.getCategory();
        return responseHelper.sendSuccessRes(res, messages.CATEGORY_FETCHED_SUCCESS, statusCode.success, category_fetched);
    });
    getAllServices = catchAsync(async (req, res) => {
        const allServices_fetched = await categoryHelper.getAllServices(req.params.categoryId);
        return responseHelper.sendSuccessRes(res, messages.CATEGORY_CREATED_SUCCESS, statusCode.success, allServices_fetched);
    });
    removeCategoryService = catchAsync(async (req, res) => {
        req.transaction = await sequelize.transaction();
        await categoryHelper.removeCategoryService(req.params.categoryId, req.transaction);
        return responseHelper.sendSuccessRes(res, messages.CATEGORY_SERVICES_DELETED_SUCCESS, statusCode.success, {});
    });
    updateCategoryService = catchAsync(async (req, res) => {
        req.transaction = await sequelize.transaction();
        await categoryHelper.updateCategoryService(req.params.categoryId, req.params.serviceId, req.body, req.transaction);
        return responseHelper.sendSuccessRes(res, messages.CATEGORY_SERVICES_UPDATED_SUCCESS, statusCode.success, {});
    });
    updateCategoryPriceService = catchAsync(async (req, res) => {
        req.transaction = await sequelize.transaction();
        await categoryHelper.updateCategoryPriceService(req.params.categoryId, req.params.serviceId, req.body, req.transaction);
        return responseHelper.sendSuccessRes(res, messages.CATEGORY_SERVICES_UPDATED_SUCCESS, statusCode.success, {});
    });

};
module.exports = new Category();