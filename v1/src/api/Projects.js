const Projects = require("../models/Projects");
const Project = require("../models/Projects");
const Users = require("../models/Users");
const insert = (data) => {
  const project = new Projects(data);
  return project.save();
};

const list = (where) => {
  return Project.find(where || {onayDurum:1}).populate({
    path: "user_id",
    select: "first_name last_name email profile_image",
  })
//   .filter(x => {
//     for (let filter in filters) {
//         if (x[filter] !== filters[filter]) {
//             return false
//         }
//     }
//     return true
// })
  ;
};



const filtrele=(where) => {
  return Projects.find(where || {isitma: "klima"})
  
};

const fav=(id)=>{
  Users.fav
}
const modify = (data, id,) => {
  return Project.findByIdAndUpdate(id, data,{ new: true });
};
const changeOnayDurum = (onayDurum, id,) => {
  return Project.findByIdAndUpdate(id, {onayDurum:0},{ new: true });
};

const remove = (id) => {
  return Project.findByIdAndDelete(id);
};
const getProject = (id) => {
  return Project.findById(id);
  
};

module.exports = {
  insert,
  list,
  modify,
  remove,
  getProject,
  changeOnayDurum,
  filtrele
};
