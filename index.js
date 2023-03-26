const express = require("express");
var cors = require("cors");
const { connection } = require("./db");
const { auth } = require("./Middlewares/auth.mw");
const { productRoutes } = require("./Routes/product.routes");
const { userRoutes } = require("./Routes/user.routes");
const app = express();
//
//
app.use(express.json());
app.use(cors());
//
//
app.get("/", (req, res) => {
  res.status(200).send("Welcome to HomePage :)");
});
//
app.use("/users", userRoutes);
app.use(auth);
app.use("/products", productRoutes);
//
//
//
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB !");
    console.log(`Port running at ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
