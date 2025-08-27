const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getAllData", (req, res) => {
  res.send("Get All Data");
});
app.delete("/admin/deleteData", (req, res) => {
  res.send("Delete Data");
});

app.get("/user/login", (req, res) => {
  res.send("Login Page");
});

app.get("/user/profile", userAuth, (req, res) => {
  res.send("User Profile");
});
app.listen("3030", () => {
  console.log("server running on 3030");
});
