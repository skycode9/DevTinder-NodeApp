const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");

const app = express();
//middleware to use for convert your upcoming json data to js object
app.use(express.json());

app.post("/signup", async (req, res) => {
  //console.log(req.body); //--> this give you undefined because of json for that we have to use express.json() middleware
  try {
    const UserData = new User(req.body);
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

// Get User from emailId
app.get("/user", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const userData = await User.findOne({ emailId: userEmail });
    if (!userData) {
      res.status(404).json({
        msg: "User Not found",
      });
    }
    res.status(200).json({
      user: userData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      msg: "something went wrong",
    });
  }
});

// Get Feed Data from database All the data
app.get("/feed", async (req, res) => {
  try {
    const UsersData = await User.find({});
    res.status(200).json({
      users: UsersData,
    });
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong",
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
