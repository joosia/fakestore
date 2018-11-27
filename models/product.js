const mongoose = require("mongoose");

// SCHEMA SETUP
const productSchema = new mongoose.Schema({
   name: {
      type: String,
   },
   description: {
      type: String,
   },
   price: {
      type: Number,
   },
   img: {
      type: String
   }
});

module.exports = mongoose.model("Product", productSchema);