const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");

const app = express();
const UserData = new User({
  firstName: "Keyur",
  lastName: "Amin",
  emailId: "ak@ak.com",
  password: "Keyur@123",
});

app.post("/signup", async (req, res) => {
  try {
    await UserData.save();
    res.status(200).json({
      msg: "UserData Added Succesfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      msg: "Something went wrong",
    });
  }
});
// This is correct way to start the application first connect to the database and start the server.
connectDB()
  .then(() => {
    console.log("Database connection is established..");
    app.listen("3030", () => {
      console.log("server running on 3030");
    });
  })
  .catch((err) => {
    console.error("Databse not connected..!");
  });
