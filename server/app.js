// create server
const express = require("express");
const mongoose = require("mongoose");
const _PORT = process.env.PORT;
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// CONNECT TO DB

  connxion = process.env.MONGO_URI;
  mongoose.connect(
    connxion
  );
  // `mongodb+srv://${username}:${password}@cluster0.0deew.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`
  
// USER MODEL
const UserModel = require("./models/Users");

// GET
app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.send(users);
});

//POST
app.post("/users", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();
  res.send(user);
});

app.listen(_PORT, () => {
  console.log("Server work");
});
