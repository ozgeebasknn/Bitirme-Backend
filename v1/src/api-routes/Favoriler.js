const express = require("express");
const { favoriler } = require("../controllers/Favoriler");
const router = express.Router();
const schemas = require("../validations/Favoriler");

const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

const {

  createFav,

} = require("../controllers/Favoriler");

// router.route("/").get(favoriler);
router
  .route("/")
  .post(authenticate,  createFav);

module.exports = {
  router,
};
