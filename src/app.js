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

// update the user by id
app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const body = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      returnDocument: "before",
    });
    //console.log(updatedUser);

    if (!updatedUser) {
      res.status(400).json({
        msg: "Not updated",
      });
    }
    res.status(200).json({
      msg: "User updated suceesfully",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Something went wrong",
    });
  }
});

// update the user by email
app.patch("/useremailid", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const data = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { emailId: userEmail },
      data,
      { returnDocument: "after" }
    );
    if (!updatedUser) {
      res.status(400).json({
        msg: "Not updated",
      });
    }
    res.status(200).json({
      msg: "updated",
    });
  } catch (error) {
    res.status(400).json({
      msg: "Something went wrong",
    });
  }
});

// Delete the user by id
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(400).json({
        msg: "user not found",
      });
    }
    res.status(200).json({
      msg: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
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
