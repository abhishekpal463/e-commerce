const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Express App Listening on Port 3000");
});

module.exports = app;
