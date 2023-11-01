const express = require("express");
const mealRouter = express.Router();
const mealController = require("../Controller/mealController");

mealRouter.route("/").get(mealController.index);

module.exports = mealRouter;
