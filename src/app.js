const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.get("/error", (req, res) => {
  try {
    // Logic of fn
    throw new Error("error");
  } catch (error) {
    res.status(500).send("something is went wrong contact support team");
  }

  res.send("Error");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.send("Something went wrong");
});

app.listen("3030", () => {
  console.log("server running on 3030");
});
