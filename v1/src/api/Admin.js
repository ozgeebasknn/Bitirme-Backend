const { findOne } = require("../models/Admin");
const Admin = require("../models/Admin");
const Projects = require("../models/Projects");
const Project = require("../models/Projects");

const insertAdmin = (data) => {
    const admin = new Admin(data);
    return admin.save();
  };
  const loginAdmin = (loginData) => {
    return Admin.findOne(loginData);
  };

  const listIlan = (where) => {
    return Projects.find(where || {onayDurum:0})
  };

  const ilanDuzenle = (onayDurum, id) => {
    return Projects.findByIdAndUpdate(id, {onayDurum:1}, { new: true });
  };

  const remove = (id) => {
    return Project.findByIdAndDelete(id);
  };
  module.exports = {
    insertAdmin,
    loginAdmin,
    listIlan,
    ilanDuzenle,
    remove
  
  };
  