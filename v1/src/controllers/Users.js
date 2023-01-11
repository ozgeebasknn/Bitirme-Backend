const {
  insert,
  list,
  loginUser,
  modify,
  remove,
  getUser,
  favIlanEkle
} = require("../api/Users");
const projectService = require("../api/Projects");
const httpStatus = require("http-status");
const {
  passwordToHash,
  generateAccessToken,
  generateRefreshToken,
} = require("../scripts/utils/helper");
const uuid = require("uuid");
const eventEmitter = require("../scripts/events/eventEmitter");
const { http } = require("winston");
const path = require("path");

const create = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  insert(req.body)
    .then((response) => {
      res.status(httpStatus.CREATED).send(response);
    })
    .catch((e) => {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    });
};


const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  loginUser(req.body)
    .then((user) => {
      if (!user)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ message: "böyle bir kullanıcı bulunmamaktadır" });

      user = {
        ...user.toObject(),
        tokens: {
          access_token: generateAccessToken(user),
          refresh_token: generateRefreshToken(user),
        },
      
      };
      delete user.password;
      res.status(httpStatus.OK).send(user);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const index = (req, res) => {
  list()
    .then((response) => {
      res.status(httpStatus.OK).send(response);
    })
    .catch((e) => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e));
};

const projectList = (req, res) => {
  req.user?._id;
  projectService
    .list({ user_id: req.user?._id })
    .then((projects) => {
      res.status(httpStatus.OK).send(projects);
    })
    .catch(() =>
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        error: "projeleri getirirken beklenmedik bir hata olustu",
      })
    );
};

const resetPassword = (req, res) => {
  const new_password =
    uuid.v4()?.split("-")[0] || `usr-${new Date().getTime()}`;
  modify({ email: req.body.email }, { password: passwordToHash(new_password) })
    .then((updatedUser) => {
      if (!updatedUser)
        return res
          .status(httpStatus.NOT_FOUND)
          .send({ error: "böyle bir kullanıcı bulunmamaktadır" });
      eventEmitter.emit("send_email", {
        to: updatedUser.email,
        subject: "Şifre Sıfırlama",
        html: `Talebiniz üzerine şifre sıfırlama işleminiz gerçekleşmiştir. <br/> Giriş yaptıktan sonra şifrenizi değiştirmeyi unutmayın. <br/> Yeni şifreniz: <b>${new_password} <b/>`,
      });
      res.status(httpStatus.OK).send({
        message:
          "Şifre sıfırlama işlemi için sisteme kayıtlı e-posta adresinize gereken bilgileri gönderdik.",
      });
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "şifre resetleme sırasinda bir hata olustu" })
    );
};

const update = (req, res) => {
  modify({ _id: req.user?._id }, req.body)
    .then((updatedUser) => {
      res.status(httpStatus.OK).send(updatedUser);
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "güncelleme işlemi sırasında bir hata oluştu" })
    );
};

const deleteUser = (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "ID bilgisi eksik",
    });
  }
  remove(req.params?.id)
    .then((deletedItem) => {
      console.log("deletedItem:>>", deletedItem);
      if (!deletedItem) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "böyle bir kayıt bulunmamaktadır",
        });
      }
      res.status(httpStatus.OK).send({
        message: "kayıt silinmiştir",
      });
    })
    .catch((e) =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "silme işlemi sırasında bir hata oluşmuştur" })
    );
};

const changePassword = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  modify({ _id: req.user?._id }, req.body)
    .then((updatedUser) => {
      res.status(httpStatus.OK).send(updatedUser);
    })
    .catch(() =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "güncelleme işlemi sırasında bir hata oluştu" })
    );
};

const updateProfileImage = (req, res) => {
  console.log(req.files);
  if (!req?.files?.profile_image) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({
        error: "bu işlemi yapabilmek için yeterli veriye sahip değilsiniz",
      });
  }
  const extension = path.extname(req.files.profile_image.name);
  const fileName = `${req?.user._id}${extension}`;
  // const fileName=req?.user._id;
  const folderPath = path.join(__dirname, "../", "uploads/users", fileName);
  req.files.profile_image.mv(folderPath, function (err) {
    if (err)
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err });
    modify({ _id: req.user._id }, { profile_image: fileName })
      .then((updatedUser) => {
        res.status(httpStatus.OK).send(updatedUser);
      })
      .catch(
        (e => res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: "upload başarılı fakat" }))
      );
  });
};
const userDetail = (req, res) => {
  getUser(req.params?.id)
    .then((detailUser) => {
      console.log("user detail:>>", detailUser);
      if (!detailUser) {
        return res.status(httpStatus.NOT_FOUND).send({
          message: "böyle bir kayıt bulunmamaktadır.",
        });
      }
      res.status(httpStatus.OK).send(detailUser)
    })
    .catch((e) =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: " bir sorun oluşmuştur" })
    );
};

const favoriIlan = (req, res) => {
  if (!req.params?.id) {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: "ID Bilgisi Eksik.",
    });
  }

  favIlanEkle(req.body, req.params?.id)
    .then((updatedIlan) => {
      res.status(httpStatus.OK).send(updatedIlan);
    })
    .catch((e) =>
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: "kayit sirasinda bir problem olustu" })
    );
};

module.exports = {
  create,
  index,
  login,
  projectList,
  resetPassword,
  update,
  deleteUser,
  changePassword,
  updateProfileImage,
  userDetail,
  favoriIlan
};
