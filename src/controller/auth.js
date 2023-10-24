const authModel = require("../model/auth");
const { response } = require("../helper/response");
// // dotenv.config();

const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      error: error.location,
    };
  },
});

module.exports = {
  register: async function (req, res) {
    try {
      console.log(req.body, "cek user")
      const checkUser = await authModel.authchecker(req.body);
      console.log(checkUser, "cek user")
      if (checkUser[0]) {
        return response(res, 403, { message: "Your Email Already Registered" });
      }

      const salt = bcrypt.genSaltSync(10),
        passwordEn = bcrypt.hashSync(req.body.userPassword, salt);
      const setData = {
        ...req.body,
        userPassword: passwordEn,
        role_id: 100,
        isActive: 0,
        note: "Need Confirmation",
      };
      const result = await authModel.register(setData)
      response(res, 200, {data: result, message : "Register Success"})
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  login: (req, res) => {
    authModel
      .login(req.body)
      .then((data) => {
        res.status(200).send({
          success: true,
          message: "Login Successfully",
          token: data,
        });
      })
      .catch((err) => {
        res.send({
          success: false,
          message: err,
        });
      });
  },
};
