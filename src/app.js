const express = require("express");

const app = express();

app.get("/middleware", (req, res, next) => {
  console.log("Route Handler");
  next();
});

app.get("/middleware", (req, res) => {
  console.log("Route Handler 2");
  res.send("Route Handeler 2");
});

app.listen("3030", () => {
  console.log("server running on 3030");
});
