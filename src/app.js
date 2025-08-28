const express = require("express");
require("../src/config/database");
const app = express();

app.listen("3030", () => {
  console.log("server running on 3030");
});
