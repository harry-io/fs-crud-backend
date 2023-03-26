const express = require("express");
const { UserModel } = require("../Models/user.model");
const userRoutes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require("../Middlewares/auth.mw");
//
//
//GET ALL USERS
userRoutes.get("/", auth, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//
//
//REGISTER NEW USER
userRoutes.post("/signup", async (req, res) => {
  const { username, email, password, age } = req.body;
  try {
    const users = await UserModel.find({ email });
    if (users.length > 0) {
      res.status(400).send({ message: "User already exists !" });
    } else {
      try {
        bcrypt.hash(password, 5, async (error, hash) => {
          const newUser = new UserModel({
            username,
            email,
            password: hash,
            age,
          });
          await newUser.save();
          res.status(200).send({
            message: "Account successfully created !",
          });
        });
      } catch (error) {
        res.status(400).send({ message: error.message });
      }
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
//LOGIN USER
userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //
  const user = await UserModel.findOne({ email });
  if (user) {
    bcrypt.compare(password, user.password, (error, result) => {
      if (result) {
        res.status(200).send({
          message: "Logged in successfully !",
          token: jwt.sign({ user_id: user.id }, "luffy"),
        });
      } else {
        res.status(400).send({
          message: "Wrong Password !",
        });
      }
    });
  } else {
    res.status(400).send({ message: "User do not exist !" });
  }
});
//
//
//
module.exports = { userRoutes };
