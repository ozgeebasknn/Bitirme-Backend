const validate = require("../middlewares/validate");
const authenticate = require("../middlewares/authenticate");

const schemas = require("../validations/Projects");
const express = require("express");
const {
  index,
  create,
  update,
  deleteProject,
  updateIlanImage,
  projectDetail,
  filtreliIlan
} = require("../controllers/Projects");
const router = express.Router();



router.route("/").get( index);
router
  .route("/")
  .post(authenticate, validate(schemas.createValidation), create);
router
  .route("/:id")
  .patch(authenticate, validate(schemas.updateValidation), update);

router.route("/:id").delete(authenticate, deleteProject);
router.route("/:id").get(projectDetail);
router.route("/ilanlar").get(filtreliIlan);


// router.route("/update-ilan-image").post( authenticate, updateIlanImage);

module.exports = {
  router,
};
