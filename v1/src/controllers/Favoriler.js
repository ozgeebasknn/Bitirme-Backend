const { favorilereEkle,  } = require("../api/Favoriler");
const httpStatus = require("http-status");
const projectService = require("../api/Projects");
const userService = require("../api/Users");
const path = require("path");


const createFav = (req, res) => {
  req.body.user_id = req.user;

  favorilereEkle(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
      
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};
 
  module.exports = {
    createFav
  };