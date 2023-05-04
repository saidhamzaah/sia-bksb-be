const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();
const cors = require("cors");
const app = express();
const db = require("./src/helper/db");
const authRouter = require("./src/route/auth");
app.unsubscribe(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
const authRoute = require("./src/route/auth");
app.use("/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
});
