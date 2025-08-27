const express = require("express");

const app = express();

// app.use("/user", (req, res) => {
//   res.send("User profile fetched");
// });

//This will only handle GET calls to /user
app.get("/user", (req, res) => {
  res.send("User profile fetched");
});

app.post("/user", (req, res) => {
  // logic to save data to database
  res.send("User data successfully saved in Database");
});

app.delete("/user", (req, res) => {
  // logic to data delete.
  res.send("User data deleted successfully");
});

// This will match all HTTP methods GET, POST, PUT, DELETE, PATCH API Calls to /test
app.use("/test", (req, res) => {
  res.send("Test from server");
});

app.listen("3030", () => {
  console.log("server running on 3030");
});
