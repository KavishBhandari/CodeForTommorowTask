const categoryController = require("./categoryController.js");

const express = require("express");
const categoryRoutes = express.Router();

categoryRoutes.post("/category", categoryController.getCategory);
categoryRoutes.put("/category/:id", categoryController.deleteCategory);
categoryRoutes.get("/categories", categoryController.updateCategory);
categoryRoutes.delete("/category", categoryController.addCategory);

categoryRoutes.post("/category/:categoryId/service", categoryController.getAllServices);
categoryRoutes.get("/category/:categoryId/services", categoryController.removeCategoryService);
categoryRoutes.delete("/category/:categoryId/service/:serviceId", categoryController.updateCategoryService);
categoryRoutes.put("/category/:categoryId/service/:serviceId", categoryController.updateCategoryPriceService);

module.exports = categoryRoutes
