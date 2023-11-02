const express = require("express");
const ingredientRouter = express.Router();
const ingredientController = require("../Controller/ingredientController");
const { authenToken } = require('../config/jwt')
ingredientRouter.route("/")
.get(ingredientController.index);

module.exports = ingredientRouter;
