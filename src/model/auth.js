const db = require("../helper/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body } = require("express-validator");

module.exports = {
  register: (setData) => {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO tb_user SET?";
      db.query(query, setData, (err, result) => {
        // console.log(query, setData, "masuk model");
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },

  login: (body) => {
    return new Promise((resolve, reject) => {
      const { userEmailorName, userPassword } = body;
      const userId = body.userEmailorName;

      const query = `Select * from tb_user where userEmail='${userId}' or userName='${userId}'`;
      db.query(query, (err, data) => {
        let dataUser = data[0];
        if (!data.length) {
          reject("Username or Password Invalid");
        } else {
          if (!err) {
            const token = jwt.sign(
              {
                userName: dataUser.userName,
                userEmail: dataUser.userEmail,
                roleId: dataUser.role_id,
                isActive: dataUser.isActive,
              },
              process.env.SECRET_KEY
            );
            // console.log(dataUser, "ini token");
            // console.log(password, "ini token", dataUser.userPassword);
            bcrypt.compare(
              userPassword,
              dataUser.userPassword,
              function (err, result) {
                // console.log(userPassword, dataUser.userPassword,"masuk model")
                if (err) {
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
  authchecker: (body) => {
    return new Promise((resolve, reject) => {
      const userEmail = body.userEmail;
      const query = `Select * from tb_user where userEmail='${userEmail}'`;
      db.query(query, (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },
};
