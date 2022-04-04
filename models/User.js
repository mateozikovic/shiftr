const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create the User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  coworkers: {
    type: Array,
    required: false,
  },
  workweek: {
    type: Array,
    requried: false,
  }
});

module.exports = User = mongoose.model("users", UserSchema);
