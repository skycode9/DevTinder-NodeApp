const express = require("express");
const requestRoutes = express.Router();

const { userAuth } = require("../middlewares/auth");

requestRoutes.get("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res
      .status(200)
      .json({ msg: user.firstName + " sent the connect request!" });
  } catch (error) {
    res.status(400).json({
      msg: "something went wrong",
      err: error.message,
    });
  }
});

module.exports = requestRoutes;
