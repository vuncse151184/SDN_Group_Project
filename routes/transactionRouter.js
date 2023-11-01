const express = require("express");
const adminRouter = express.Router();
const adminController = require("../Controller/adminController");
const { authenToken } = require('../config/jwt')
const passport = require('passport')

adminRouter.route("/:username/:password")
    .post(adminController.signin)

adminRouter.route('/protected')
    .get(authenToken, (req, res) => {
        return res.status(200).send({
            success: true,
            user: {
                id: req.user._id,
                username: req.user.username
            }
        })
    })
module.exports = adminRouter;