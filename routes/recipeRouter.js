const express = require("express");
const recipeRouter = express.Router();
const recipeController = require("../Controller/recipeController");

// function addUserDataToRequest(req, res, next) {
//   if (req.isAuthenticated()) {
//     req.user = req.user;
//   }
//   next();
// }
// const { ensureAuthenticated } = require("../config/auth");

recipeRouter
  .route("/")
  .get(recipeController.index)
  .post(recipeController.create);

recipeRouter
  .route("/edit/:recipedId")
  .get(recipeController.detail)
  .put(recipeController.update);

recipeRouter.route("/delete/:recipedId").get(recipeController.remove);

module.exports = recipeRouter;
