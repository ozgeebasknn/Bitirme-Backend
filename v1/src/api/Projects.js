const Projects = require("../models/Projects");
const Project = require("../models/Projects");
const insert = (data) => {
  const project = new Projects(data);
  return project.save();
};

const list = (where) => {
  return Project.find(where || {}).populate({
    path: "user_id",
    select: "first_name last_name email profile_image",
  }).filter(x => {
    for (let filter in filters) {
        if (x[filter] !== filters[filter]) {
            return false
        }
    }
    return true
})
  ;
};

const modify = (data, id) => {
  return Project.findByIdAndUpdate(id, data, { new: true });
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
};
