const express = require("express");

const app = express();

app.get("/admin/getAllData", (req, res) => {
  // need to check is admin is logged in or not
  const token = "Admin";
  const isAdmin = token === "Admin";
  if (!isAdmin) {
    return res.status(401).send("You are not authorized");
  }
  res.send("Get All Data");
});
app.delete("/admin/deleteData", (req, res) => {
  // need to check is admin is logged in or not
  const token = "Admin1";
  const isAuthorized = token === "Admin";
  if (!isAuthorized) {
    return res.status(401).send("Your are not authorized");
  }
  res.send("Delete Data");
});
app.listen("3030", () => {
  console.log("server running on 3030");
});
