const express = require("express");
const profileRoutes = express.Router();

const { userAuth } = require("../middlewares/auth");

profileRoutes.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      user: user,
    });
  } catch (error) {
    res.status(400).json({
      msg: "something went wrong",
      err: error.message,
    });
  }
});

module.exports = profileRoutes;
