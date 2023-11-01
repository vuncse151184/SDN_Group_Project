const express = require("express");
const recipeRouter = express.Router();
const recipeController = require("../Controller/recipeController");

recipeRouter
  .route("/")
  .get(recipeController.index)
  .get(recipeController.mostFavorite)
  .post(recipeController.create);

recipeRouter
  .route("/edit/:recipedId")
  .get(recipeController.detail)
  .put(recipeController.update);

recipeRouter.route("/delete/:recipedId").get(recipeController.remove);

module.exports = recipeRouter;
