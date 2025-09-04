const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/ConnectionRequest");
const userRoutes = express.Router();

const USER_DATA = "firstName lastName photoUrl";

// Get all the pending connection request for the loggedIn user
userRoutes.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    if (connectionRequest.length == 0) {
      return res.status(404).json({ msg: "Data not found..!" });
    }
    res.status(200).json({ connectionRequest });
  } catch (error) {
    return res
      .status(400)
      .json({ msg: "Something went wrong", Error: error.message });
  }
});

// Get all the sending connection request for the loggedIn user
userRoutes.get("/user/view/sending/request", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      fromUserId: loggedInUser._id,
      status: "interested",
    }).populate("toUserId", USER_DATA);
    if (connectionRequest.length == 0) {
      return res.status(404).json({ msg: "Data not found" });
    }
    res
      .status(200)
      .json({ msg: "Data fetched successfully", data: connectionRequest });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong", error: error.message });
  }
});

// get all the connection who accept my connection request and i accepte their connection request
userRoutes.get("/user/view/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { fromUserId: loggedInUser._id, status: "accepted" },
        { toUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_DATA)
      .populate("toUserId", USER_DATA);

    if (connectionRequest.length == 0) {
      return res.status(404).json({ msg: "Data not found..!" });
    }

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.equals(loggedInUser._id)) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.status(200).json({ msg: "Data fetched successfully", data: data });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong", error: error.message });
  }
});
module.exports = userRoutes;
