const express = require("express");
const recipeRouter = express.Router();
const recipeController = require("../Controller/recipeController");
const { authenToken } = require("../config/jwt");

recipeRouter
  .route("/")
  .get(authenToken, recipeController.index)
  .get(authenToken, recipeController.mostFavorite)
  .post(authenToken, recipeController.create);

recipeRouter
  .route("/edit/:recipedId")
  .get(authenToken, recipeController.detail)
  .put(authenToken, recipeController.update);

recipeRouter
  .route("/delete/:recipedId")
  .get(authenToken, recipeController.remove);

module.exports = recipeRouter;
