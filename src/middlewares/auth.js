const adminAuth = (req, res, next) => {
  const token = "Admin1";
  const isAuthorized = token === "Admin";
  if (!isAuthorized) {
    return res.status(401).json({
      msg: "not authorized",
    });
  }
  next();
};

const userAuth = (req, res, next) => {
  const token = "User1";
  const isAuthorized = token === "User";
  if (!isAuthorized) {
    return res.status(401).json({
      msg: "Not Authorized",
    });
  }
  next();
};

module.exports = { adminAuth, userAuth };
