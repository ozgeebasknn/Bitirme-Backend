const { insert, modify, list, remove, getProject } = require("../api/Projects");
const httpStatus = require("http-status");
const { listIndexes } = require("../models/Projects");
const path = require("path");

const index = (req, res) => {
  // console.log("req:>>",req.user);
  list(undefined, req.query)
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const create = (req, res) => {
  req.body.user_id = req.user;
  project.ilan_image = req.files.map
  insert(req.body)
    .then((response) => {
      // if (!req?.files?.ilan_image) {
      //   return res
      //     .status(httpStatus.BAD_REQUEST)
      //     .send({
      //       error: "bu işlemi yapabilmek için yeterli veriye sahip değilsiniz",
      //     });
      // }
      // const extension = path.extname(req.files.ilan_image.name);
      // const fileName = `${req?.project._id}${extension}`;
      // // const fileName=req?.user._id;
      // const folderPath = path.join(__dirname, "../", "uploads/projects", fileName);
      // req.files.ilan_image.mv(folderPath, function (err) {
      //   if (err)
      //     return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err });
      //   modify({ _id: req.project._id }, { ilan_image: fileName })
      //     .then((updatedProject) => {
      //       res.status(httpStatus.OK).send(updatedProject);
      //     })
      //     .catch(
      //       (e => res
      //         .status(httpStatus.INTERNAL_SERVER_ERROR)
      //         .send({ error: "upload başarılı fakat" }))
      //     );
      // });
      res.status(httpStatus.CREATED).send(response);
      
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};

const update = (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "ID Bilgisi Eksik.",
    });
  }

  modify(req.body, req.params?.id)
    .then((updatedProject) => {
      updatedProject.onayDurum==0
      res.status(httpStatus.OK).send(updatedProject);
    })
    .catch((e) =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "kayit sirasinda bir problem olustu" })
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

const projectDetail = (req, res) => {
  getProject(req.params?.id)
    .then((detailProject) => {
      console.log("project detail:>>", detailProject);
      if (!detailProject) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "böyle bir kayıt bulunmamaktadır.",
        });
      }
      res.status(httpStatus.OK).send(detailProject)
    })
    .catch((e) =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: " bir sorun oluşmuştur" })
    );
};
  // if (!req.params?.id) {
  //   return res.status(httpStatus.BAD_REQUEST).send({
  //     message: "ID bilgisi eksik",
  //   });
  // }
  // getProject(req.params?.id)
  //   .then((detailProject) => {
  //     console.log("project:>>", detailProject);
  //     if(!projectDetail){
  //       return res.status(httpStatus.NOT_FOUND).send({
  //         message:"böyle bir kayıt bulunmamaktadır."
  //       })
  //     }
  //     res.status(httpStatus.OK).send({
  //       message: "proje silinmiştir",
  //     });
  //   })
  //   .catch((e) =>
  //     res
  //       .status(httpStatus.INTERNAL_SERVER_ERROR)
  //       .send({ error: "silme işlemi sırasında bir sorun oluşmuştur" })
  //   );



  const updateIlanImage = (req, res) => {
    const ilan = {}
    ilan.isim = req.body.ilan_ismi
    ilan.photos = req.files.map
    res.send("basarılı")
  };

module.exports = {
  create,
  index,
  update,
  deleteProject,
  updateIlanImage,
  projectDetail,
};
