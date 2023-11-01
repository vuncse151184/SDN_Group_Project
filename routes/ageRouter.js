const express = require("express");
const ageouter = express.Router();
const ageController = require("../Controller/ageController");

ageouter.route("/").get(ageController.index);

module.exports = ageouter;
