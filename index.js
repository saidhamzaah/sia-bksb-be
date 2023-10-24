// ------------------------ Dependencies ------------------- //
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
require("dotenv").config();
const cors = require("cors");
const app = express();
const db = require("./src/helper/db");

// ------------------------ Routing ----------------------- //
const authRoute = require("./src/route/auth");
const userRoute = require("./src/route/user");

app.unsubscribe(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

// ------------------------- Calling Route ------------------ //
app.use("/auth", authRoute);
app.use("/user", userRoute);

// ------------------------- DB Connection Test ------------------- //
app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
});
