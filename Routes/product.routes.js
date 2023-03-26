const express = require("express");
const { ProductModel } = require("../Models/product.model");
const productRoutes = express.Router();
const jwt = require("jsonwebtoken");

//
//
//GET PRODUCTS(ALL)
productRoutes.get("/", async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//GET PRODUCTS(ADMIN)
productRoutes.get("/admin", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "luffy");
  try {
    if (decoded) {
      const products = await ProductModel.find({ user_id: decoded.user_id });
      res.status(200).send(products);
    } else {
      res.status(400).send({ message: "Please login first !" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//SINGLE PRODUCT
productRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductModel.findById(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//POST PRODUCTS
productRoutes.post("/", async (req, res) => {
  const productData = req.body;
  try {
    const newProduct = new ProductModel(productData);
    await newProduct.save();
    res.status(200).send({ message: "Product was added successfully !" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//PATCH PRODUCTS
productRoutes.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const newProductData = req.body;
  try {
    await ProductModel.findByIdAndUpdate(id, newProductData);
    res.status(200).send({ message: "Product was updated successfully !" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//DELETE PRODUCTS
productRoutes.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await ProductModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Product was deleted successfully !" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//
//
//
module.exports = { productRoutes };
