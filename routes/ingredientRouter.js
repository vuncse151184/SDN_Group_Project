const express = require("express");
const ingredientRouter = express.Router();
const ingredientController = require("../Controller/ingredientController");

ingredientRouter.route("/").get(ingredientController.index);

module.exports = ingredientRouter;
