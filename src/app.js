const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();
// order of routes is matter
app.use((err, req, res, next) => {
  console.log(err);
  res.send("Something went wrong");
});

app.get("/error", (req, res) => {
  throw new Error("Something went wrong");
  res.send("Error");
});

app.listen("3030", () => {
  console.log("server running on 3030");
});
