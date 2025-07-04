const model = require("../../../database/models");
const dbHelper = require("../../../helper/dbHelper");
const ApiError = require("../../../utils/ApiError");
const { statusCode, messages } = require("../../../utils/constant");

class CategoryHelper {
    addCategory = async (body, transaction) => {
        return await dbHelper.createData(model.category, body, transaction);
    };
    addCategroryService = async (category_creation_id, body_category_service, transaction) => {
        return await dbHelper.createData(model.category_service, { ...body_category_service, category_id: category_creation_id }, transaction);
    }
    addCategroryServicePrice = async (categroryServiceCreatation_id, categoryServicePrice, transaction) => {
        const CategroryServicePrice = categoryServicePrice.map((element) => ({
            ...element,
            category_service_id: categroryServiceCreatation_id
        }));
        await dbHelper.createData(model.category_service_price, CategroryServicePrice, transaction, true);
    }
    updateCategory = async (body, transaction) => {
        return await dbHelper.updateData(model.category, body, { id: body.id }, transaction);
    };
    deleteCategory = async (id, transaction) => {
        return await dbHelper.deleteData(model.category, { id: id }, transaction);
    };
    getCategory = async () => {
        return await dbHelper.getData(model.category,
            ["id", "category_name"],
            { where: { deleted_at: null } },
            false
        );
    };
    getAllServices = async (categoryId) => {
        return await dbHelper.getData(model.category,
            ["id", "category_name"],
            {
                where: { deleted_at: null, id: categoryId },
                include: [
                    {
                        model: model.category_service,
                        attributes: ["id", "category_id", "service_name", "type"],
                        include: [
                            {
                                model: model.category_service_price,
                                attributes: ["id", "category_service_id", "duration", "price"],
                            }
                        ]
                    }
                ]
            },
            false
        );
    };
    removeCategoryService = async (categoryId, transaction) => {
        return await dbHelper.deleteData(model.category_service, { id: categoryId }, transaction);
    };
    updateCategoryService = async (categoryId, serviceId, body, transaction) => {
        const category_data = await dbHelper.updateData(model.category, { category_name: body.category_name }, { id: categoryId }, transaction);
        if (!category_data) {
            throw ApiError.customError(statusCode.BAD_REQUEST, messages.CATEGORY_NOT_FOUND)
        }
        else {
            await dbHelper.updateData(model.category_service, body.category_service, { id: serviceId }, transaction);
        }
    };
    updateCategoryPriceService = async (categoryId, serviceId, body, transaction) => {
        const data = await dbHelper.getData(
            model.category,
            ["id"],
            {
                where: {
                    id: categoryId
                },
                include: [
                    {
                        model: model.category_service,
                        where: {
                            category_id: categoryId
                        },
                        include: [
                            {
                                model: model.category_service_price,
                                where: {
                                    category_service_id: serviceId
                                }
                            }
                        ]
                    }
                ]
            }
        )
        if (data) {
            return await dbHelper.updateData(
                model.category_service_price,
                { price: body.price },
                { category_service_id: serviceId },
                transaction
            );
        }else{
            throw ApiError.customError(statusCode.BAD_REQUEST, "please provide valid id's");
        }
    }
};
module.exports = new CategoryHelper();