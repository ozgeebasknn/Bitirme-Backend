const express = require("express");
const { favoriler } = require("../controllers/Favoriler");
const router = express.Router();

router.route("/").get(favoriler);

module.exports = {
  router,
};
