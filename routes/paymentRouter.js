const express = require("express");
const paymentRouter = express.Router();
const paymentController = require("../Controller/paymentController");

paymentRouter
  .route("/")
  .get(recipeController.index)
  .get(recipeController.mostFavorite)
  .post(recipeController.create);

  paymentRouter
  .route("/edit/:recipedId")
  .get(recipeController.detail)
  .put(recipeController.update);

recipeRouter.route("/delete/:recipedId").get(recipeController.remove);

module.exports = paymentRouter;
