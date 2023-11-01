const express = require("express");
const adminRouter = express.Router();
const adminController = require("../Controller/adminController");

adminRouter.route("/")
    .get(adminController.form);

adminRouter.route('/search')
    .post(adminController.signup)
adminRouter.route('/:id')
    .get(adminController.dashboard)
module.exports = adminRouter;