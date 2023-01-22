const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema(
  {
    first_name: String,
    last_name:String,
    password: String,
    role: { type: String, default: 'user' },
    email: {
      type: String,
      unique: true,
    },
     favorites:[],
  
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model("user", UserSchema);
