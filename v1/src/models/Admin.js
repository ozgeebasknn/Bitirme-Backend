const Mongoose = require("mongoose");

const AdminSchema = new Mongoose.Schema(
  {
    user_name: String,
    password: String,
    role: { type: String, default: 'admin' }
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("admin", AdminSchema);
