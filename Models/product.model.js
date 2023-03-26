const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  image: String,
  title: String,
  brand: String,
  description: String,
  price: Number,
  category: String,
  user_id: String,
});
const ProductModel = mongoose.model("product", productSchema);
//
//
//
module.exports = { ProductModel };
