const mongoose = require("mongoose");

// SCHEMA SETUP
const userSchema = new mongoose.Schema({
   email: {
      type: String,
      unique: true,
      required: true,
      trim: true // trim white space
   },
   username: {
      type: String,
      unique: true,
      required: true,
      trim: true
   },
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
      type: String,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   passwordConf: {
      type: String,
      required: true,
   },
});

module.exports = mongoose.model("User", userSchema);