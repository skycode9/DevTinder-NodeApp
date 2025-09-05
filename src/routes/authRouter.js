const express = require("express");
const authRoutes = express.Router();

const User = require("../models/User");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const { userAuth } = require("../middlewares/auth");

authRoutes.post("/signup", async (req, res) => {
  //console.log(req.body); //--> this give you undefined because of json for that we have to use express.json() middleware
  try {
    // Extract the req.body
    const { firstName, lastName, emailId, password } = req.body;
    // Validating the req.body data
    validateSignUpData(req);
    // Encrypting the passwords
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save in Database ---> right way to save data
    const UserData = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    });
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

authRoutes.post("/login", async (req, res) => {
  try {
    // extreact the req.body
    const { emailId, password } = req.body;

    // find the user is exits or not
    const isUserExits = await User.findOne({ emailId: emailId });
    if (!isUserExits) {
      throw new Error("Authentication Failed..!");
    }

    // check the password is correct or not
    const isUserAuthorized = await isUserExits.validatePassword(password);
    if (!isUserAuthorized) {
      throw new Error("Auhthentication Failed..!");
    }

    // Create a JWT Token
    const token = await isUserExits.getJWT();

    // Add the token to cookie and send the response back to the user
    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.status(200).json({
      msg: "Login Successfully",
      data: isUserExits,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Something went wrong",
      err: error.message,
    });
  }
});

authRoutes.post("/logout", userAuth, async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.status(200).json({ msg: "Logout Successfully..!" });
});

module.exports = authRoutes;
