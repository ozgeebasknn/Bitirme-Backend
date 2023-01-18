const { favorilereEkle,  } = require("../api/Favoriler");
const httpStatus = require("http-status");
const projectService = require("../api/Projects");
const userService = require("../api/Users");
const path = require("path");

const favoriler = (req, res) => {
    req.body.user_id = req.user;
    req.body.project_id = req.project;
    req.body.kira = req.project;
    req.body.isitma = req.project;
    req.body.esyaDurumu = req.project;
    req.body.balkonDurumu = req.project;
    req.body.odaSayisi = req.project;
    req.body.aciklama = req.project;
    req.body.onayDurum = req.project;
    req.body.favoriDurum = req.project;
    req.body.name = req.project;
    favorilereEkle(req.body)
      .then((response) => {
       
        res.status(httpStatus.CREATED).send(response);
        
      })
      .catch((e) => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
      });
  };

 
  module.exports = {
   favoriler
  };