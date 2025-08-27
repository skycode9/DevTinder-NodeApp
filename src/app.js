const express = require("express");

const app = express();

app.use("/admin", (req, res, next) => {
  console.log("Admin routes check every time to go Admin sites");
  const token = "Admin";
  const isAuthorized = token === "Admin";
  if (!isAuthorized) {
    return res.status(401).send("Your are not authorized");
  }
  next();
});

app.get("/admin/getAllData", (req, res) => {
  res.send("Get All Data");
});
app.delete("/admin/deleteData", (req, res) => {
  res.send("Delete Data");
});
app.listen("3030", () => {
  console.log("server running on 3030");
});
