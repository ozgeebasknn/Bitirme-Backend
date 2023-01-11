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