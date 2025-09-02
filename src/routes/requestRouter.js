const express = require("express");
const requestRoutes = express.Router();

const { userAuth } = require("../middlewares/auth");
const User = require("../models/User");
const ConnectionRequestModel = require("../models/ConnectionRequest");
const ConnectionRequest = require("../models/ConnectionRequest");

requestRoutes.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const isValidToUserId = await User.findById(toUserId);
      if (!isValidToUserId) {
        throw new Error("User Not Found..!");
      }

      const allowedStatus = ["ignored", "interested"];
      const isStatusValid = allowedStatus.includes(status);
      if (!isStatusValid) {
        throw new Error("invalid status type" + status);
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        throw new Error("Connection Request Already Exists!!");
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.status(200).json({
        msg: `${req.user.firstName} successfully sent the request to ${isValidToUserId.firstName}`,
      });
    } catch (error) {
      res.status(400).json({
        msg: "something went wrong",
        err: error.message,
      });
    }
  }
);

module.exports = requestRoutes;
