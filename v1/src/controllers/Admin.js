const {
  insertAdmin,
  loginAdmin,
  listIlan,
  ilanDuzenle,
  remove
  
} = require("../api/Admin");

const httpStatus = require("http-status");
const projectService = require("../api/Projects");
const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/helper");
const uuid = require("uuid");
const eventEmitter = require("../scripts/events/eventEmitter");
const { http } = require("winston");
const path = require("path");

const createAdmin = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  insertAdmin(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};


const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  loginAdmin(req.body)
    .then((admin) => {
      if (!admin)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "böyle bir kullanıcı bulunmamaktadır" });

      admin = {
        ...admin.toObject(),
        tokens: {
          access_token: generateAccessToken(admin),
          refresh_token: generateRefreshToken(admin),
        },
      
      };
      delete admin.password;
      res.status(httpStatus.OK).send(admin);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const listele = (req, res) => {
  // console.log("req:>>",req.user);
  listIlan()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const updateIlan = (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "ID Bilgisi Eksik.",
    });
  }

  ilanDuzenle(req.body, req.params?.id)
    .then((updatedIlan) => {
      res.status(httpStatus.OK).send(updatedIlan);
    })
    .catch((e) =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "onaylama sirasinda bir problem olustu" })
    );
};

const deleteProject = (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "ID bilgisi eksik",
    });
  }
  remove(req.params?.id)
    .then((deletedProject) => {
      console.log("deletedProject:>>", deletedProject);
      if (!deleteProject) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "böyle bir kayıt bulunmamaktadır.",
        });
      }
      res.status(httpStatus.OK).send({
        message: "proje silinmiştir",
      });
    })
    .catch((e) =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "silme işlemi sırasında bir sorun oluşmuştur" })
    );
};

module.exports = {
  createAdmin,
  listele,
  login,
  updateIlan,
  deleteProject

};