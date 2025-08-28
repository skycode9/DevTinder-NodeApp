const express = require("express");
const connectDB = require("./config/database");
const app = express();

// This is correct way to start the application first connect to the database and start the server.
connectDB()
  .then(() => {
    console.log("Database connection is established..");
    app.listen("3030", () => {
      console.log("server running on 3030");
    });
  })
  .catch((err) => {
    console.error("Databse not connected..!");
  });
