const httpStatus = require("http-status");
const JWT = require("jsonwebtoken");
const { model } = require("mongoose");

const authenticateToken = (req, res, next) => {
  const autHeader = req.headers["authorization"];
  const token = autHeader && autHeader.split(" ")[1];
  console.log("token",token)
  if (token == null) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .send({ error: "bu islemi yapmak icin ilk olarak oturum acmalisiniz." });
      
  }

  JWT.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY, (err, user) => {
    if (err)
      return res
        .status(httpStatus.FORBIDDEN)
        .send({ error: "token suresi geçmiş" });
     req.user = user?._doc;
    // req.user=user;
    next();
  });
};
console.log(authenticateToken)

module.exports=authenticateToken;
