const express = require("express");
const router = express.Router();
const { body } = require('express-validator')

const authController = require("../controller/auth");

router.post("/register", authController.register);
router.get("/login", authController.login);

module.exports = router;
