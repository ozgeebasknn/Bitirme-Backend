const Favoriler = require("../models/Favoriler");
// const Favori = require("../models/Favoriler");

const favorilereEkle = (data) => {
  const favori = new Favoriler(data);
  return favori.save();
};

module.exports = {
  favorilereEkle,
 
};
