const allRoutes = require("./admin/category/categoryRoutes");
const authRoutes = require("./admin/Authentication/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const express = require("express");
const indexRoutes = express.Router();

indexRoutes.use("/",  allRoutes);
indexRoutes.use("/", authRoutes);

module.exports = indexRoutes;
