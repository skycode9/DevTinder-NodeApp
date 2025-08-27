const express = require("express");

const app = express();

app.use(
  "/middleware",
  (req, res, next) => {
    console.log("Route Handler");
    //res.send("Route Handler 1");
    next();
  },
  (req, res) => {
    console.log("Route Handler 2");
    res.send("Route Handler 2");
  }
);

app.listen("3030", () => {
  console.log("server running on 3030");
});
