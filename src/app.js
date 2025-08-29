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
    res.status(400).json({
      msg: "Something went wrong",
      err: error.message,
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

    res.status(400).json({
      msg: "something went wrong",
      err: error.message,
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
    res.status(400).json({
      msg: "something went wrong",
      err: error.message,
    });
  }
});

// update the user by id
app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const body = req.body;

    // If updating emailId, check for duplicates first
    if (body.emailId) {
      const existingUser = await User.findOne({ 
        emailId: body.emailId,
        _id: { $ne: userId } // Exclude current user
      });
      if (existingUser) {
        return res.status(400).json({
          msg: "Email already exists",
          err: "Duplicate email address"
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(400).json({
        msg: "User not found",
      });
    }
    res.status(200).json({
      msg: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        msg: "Email already exists",
        err: "Duplicate email address"
      });
    }
    res.status(400).json({
      msg: "Something went wrong",
      err: error.message,
    });
  }
});

// update the user by email
app.patch("/useremailid", async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const data = req.body;

    // If updating emailId, check for duplicates first
    if (data.emailId && data.emailId !== userEmail) {
      const existingUser = await User.findOne({ emailId: data.emailId });
      if (existingUser) {
        return res.status(400).json({
          msg: "Email already exists",
          err: "Duplicate email address"
        });
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { emailId: userEmail },
      data,
      { returnDocument: "after", runValidators: true }
    );
    if (!updatedUser) {
      return res.status(400).json({
        msg: "User not found",
      });
    }
    res.status(200).json({
      msg: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        msg: "Email already exists",
        err: "Duplicate email address"
      });
    }
    res.status(400).json({
      msg: "Something went wrong",
      err: error.message,
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
      err: error.message,
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
