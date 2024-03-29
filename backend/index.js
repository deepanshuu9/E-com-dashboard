const express = require("express");
const cors = require("cors");
const app = express();
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const jwt = require("jsonwebtoken");
const jwtKey = "e-com";

app.use(express.json());
app.use(cors());

//Signup Api
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      res.send({ result: "something went wrong, try again" });
    }
    res.send({ result, auth: token });
  });
});

//login Api
app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body).select("-password");
  if (user) {
    jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({ result: "something went wrong, try again" });
      }
      res.send({ user, auth: token });
    });
  } else {
    res.send(req.body);
  }
});

//add-product Api
app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

//products Api
app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "No Products found" });
  }
});

//delete product Api
app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

//find product Api
app.get("/product/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "No Record Found" });
  }
});

//update product Api
app.put("/product/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

//search product Api
app.get("/search/:key", verifyToken, async (req, res) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

//verify token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  console.warn("middle", token);
  next();
}

app.listen(8000);
