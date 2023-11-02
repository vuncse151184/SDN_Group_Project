const express = require("express");
const recipeRouter = express.Router();
const recipeController = require("../Controller/recipeController");
const { authenToken } = require("../config/jwt");

recipeRouter
  .route("/")
  .get(authenToken, recipeController.index)
  .get(authenToken, recipeController.mostFavorite);

recipeRouter.route("/create-recipe").post(authenToken, recipeController.create);
recipeRouter
  .route("/detail-recipe/:recipeId")
  .get(authenToken, recipeController.detail);

recipeRouter.route("/edit/:recipeId").put(authenToken, recipeController.update);
// .get(authenToken, recipeController.detail)

recipeRouter
  .route("/delete-recipe/:recipeId")
  .delete(authenToken, recipeController.remove);

module.exports = recipeRouter;
