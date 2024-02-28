const db = require("../helper/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body } = require("express-validator");

module.exports = {
  showAllUser: function () {
    return new Promise((resolve, reject) => {
      db.query(
        `select tb_user.userEmail, tb_user.userName , tb_role.roleName, tb_role.roleLevel from tb_user inner join tb_role on tb_user.role_id= tb_role.id`,
        (err, result) => {
          if (!err) resolve(result);
          else reject(new Error(err));
        }
      );
    });
  },
  showAllUserExcept: function (userEmail) {
    return new Promise((resolve, reject) => {
      db.query(
        `select tb_user.userEmail, tb_user.userName , tb_role.roleName, tb_role.roleLevel from tb_user inner join tb_role on tb_user.role_id= tb_role.id where not tb_user.userEmail=${userEmail}`,
        (err, result) => {
          if (!err) resolve(result);
          else reject(new Error(err));
        }
      );
    });
  },
};
