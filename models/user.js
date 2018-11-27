const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
});

//hash password before saving it to the database
userSchema.pre('save', function (next) {
   let user = this;
   bcrypt.hash(user.password, 10, (err, hash) => {
      if (err)
         console.log(err);
      else {
         user.password = hash;
         next(); // Continue with middleware function
      }
   })
});

module.exports = mongoose.model("User", userSchema);