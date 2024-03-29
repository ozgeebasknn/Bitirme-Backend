const validate=require("../middlewares/validate");
const authenticate=require("../middlewares/authenticate");
// const schemas=require("../validations/Admin");
const express=require("express");
const {createAdmin ,login,listele,updateIlan,deleteProject}=require("../controllers/Admin")

const router=express.Router();

router.route("/").get( listele);
router.route("/").post(createAdmin);

router.route("/login").post(login);
router
  .route("/adminIlan/:id")
  .get(updateIlan);
router.route("/:id").delete(authenticate, deleteProject);


module.exports={
    router,
}