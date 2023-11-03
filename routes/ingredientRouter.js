const express = require("express");
const ingredientRouter = express.Router();
const ingredientController = require("../Controller/ingredientController");
const { authenToken } = require('../config/jwt')
ingredientRouter.route("/")
    .get(ingredientController.index)

ingredientRouter.route("/create-ingredient")
    .post(authenToken, ingredientController.create);

ingredientRouter.route("/update/:id")
    .put(authenToken, ingredientController.update);

ingredientRouter.route("/delete-ingredient/:id")
    .delete(authenToken, ingredientController.remove);
module.exports = ingredientRouter;
