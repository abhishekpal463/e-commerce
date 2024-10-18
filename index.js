// app.js
const express = require("express");
var cors = require('cors')
const bodyParser = require("body-parser");
require("dotenv").config();
const routes= require('./routes/routes');
const router = express.Router();

const app = express();
app.use(cors());
app.use(bodyParser.json());
router.use(routes);
app.use("/", router);

// app.listen(3000, () => {
//   console.log("Express App Listening on Port 3000");
// });

module.exports = app;
