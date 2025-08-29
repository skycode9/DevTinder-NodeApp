const jwt = require("jsonwebtoken");
const User = require("../models/User");
const userAuth = async (req, res, next) => {
  try {
    const cookie = req.cookies; // ---> for this we need to parser the cookie
    const { token } = cookie;
    if (!token) {
      throw new Error("Token is Not found..!");
    }

    const decodedData = await jwt.verify(token, "DevTinder@92839!@#$");
    console.log(decodedData);

    const { _id } = decodedData;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User does not exits..!");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      msg: "something went wrong",
      err: error.message,
    });
  }
};

module.exports = { userAuth };
