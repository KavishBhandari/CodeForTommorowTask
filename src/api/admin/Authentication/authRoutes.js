const signInController = require("./authController");

const express = require("express");
const authenticationRoutes = express.Router();

authenticationRoutes.post("/signIn", signInController);

module.exports = authenticationRoutes;