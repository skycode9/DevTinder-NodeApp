const express = require("express");

const app = express();

// app.use("/user", (req, res) => {
//   res.send("User profile fetched");
// });

//This will only handle GET calls to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Akash", lastName: "Amin", age: 22 });
});

// Request Params ex: /user?firstName:"Akash"&lastName:"Amin"
app.get("/user1/", (req, res) => {
  console.log(req.query);
  res.send("req query example");
});

// Routes Params ex: /user/:userId/:password
app.get("/user2/:userId/:password", (req, res) => {
  console.log(req.params);
  res.send("req params example");
});

// This will match all HTTP methods GET, POST, PUT, DELETE, PATCH API Calls to /test
app.use("/test", (req, res) => {
  res.send("Test from server");
});

app.listen("3030", () => {
  console.log("server running on 3030");
});
