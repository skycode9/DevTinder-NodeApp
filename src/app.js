const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.send("Namste DevTinder");
});

app.use("/hello", (req, res) => {
  res.send("Hello from the server");
});

app.use("/test", (req, res) => {
  res.send("Test from server");
});

app.listen("3030", () => {
  console.log("server running on 3030");
});
