const { findOne } = require("../models/Users");
const User = require("../models/Users");
const Projects = require("../models/Projects");

const insert = (data) => {
  const user = new User(data);
  return user.save();
};
const loginUser = (loginData) => {
  return User.findOne(loginData);
};

const list = () => {
  return User.find({});
};

const modify = (where, updateData) => {
  return User.findOneAndUpdate(where, updateData, { new: true });
};

const remove = (id) => {
  return User.findByIdAndDelete(id);
};
const getUser = (id) => {
  return User.findById(id);
};

const favIlanEkle = (favoriDurum, id) => {
  return Projects.findByIdAndUpdate(id, {favoriDurum:1}, { new: true });
};



module.exports = {
  insert,
  list,
  loginUser,
  modify,
  remove,
  getUser,
  favIlanEkle
};
