const db = require("../helper/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body } = require("express-validator");

module.exports = {
  register: (body) => {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, function (err, salt) {
        const { password } = body;
        bcrypt.hash(password, salt, function (err, hashedPassword) {
          const newBody = {
            userEmail: body.email,
            userName: body.username,
            userPassword: hashedPassword,
            role_id: body.role,
          };
          if (err) {
            reject(err);
          }
          const query = "INSERT INTO tb_user SET?";
          db.query(query, newBody, (err, data) => {
            if (!err) {
              resolve(newBody);
            } else {
              reject(err);
            }
          });
        });
      });
    });
  },

  login: (body) => {
    return new Promise((resolve, reject) => {
      const { username, password } = body;
      const userName = body.username;

      const query = `Select * from tb_user where userName=?`;
      db.query(query, userName, (err, data) => {
        let dataUser = data[0];
        if (!data.length) {
          reject("Username or Password Invalid");
        } else {
          if (!err) {
            const token = jwt.sign(
              {
                username: dataUser.userName,
                roleId: dataUser.role_id,
              },
              process.env.SECRET_KEY
            );
            // console.log(dataUser, "ini token");
            // console.log(password, "ini token", dataUser.userPassword);
            bcrypt.compare(
              password,
              dataUser.userPassword,
              function (err, result) {
                if (err) {
                  console.log("err pertama");
                  reject("Email or Password Invalid");
                } else {
                  if (!result) {
                    reject("Email or Password Invalid");
                  } else {
                    const sql = `Select * from tb_user where userPassword=?`;
                    db.query(sql, dataUser.userPassword, (err, data) => {
                      if (!err) {
                        resolve(token);
                      } else {
                        reject("Email or Password Invalid");
                      }
                    });
                  }
                }
              }
            );
          } else {
            reject(err);
          }
        }
      });
    });
  },
};
