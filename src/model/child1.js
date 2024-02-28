const db = require("../helper/db");
const { generateID } = require("../helper/idtimestamp");
const genID = "bksbsia-child1";
module.exports = {
  searchchild1ByParent: function (accountParent, isDeleted) {
    return new Promise((resolve, reject) => {
      if (isDeleted == "false") {
        //------------------------------ show deleted or active only -------------------
        console.log(accountParent, "ini parent");
        db.query(
          `SELECT * FROM tb_child1 WHERE accountParent='${accountParent}' AND isDeleted=${isDeleted}`,
          (err, res) => {
            if (!err) {
              resolve(res);
            } else {
              reject(new Error(err));
            }
          }
        );
      } else {
        //------------------------------ SHOW ALL-----------------
        db.query(
          `SELECT * FROM tb_child1 WHERE accountParent='${accountParent}'`,
          (err, res) => {
            if (!err) {
              resolve(res);
            } else {
              reject(new Error(err));
            }
          }
        );
      }
    });
  },
  createchild1: function (data) {
    return new Promise((resolve, reject) => {
      // ('id', 'accountID', 'accountName', 'accountParent', 'createdBy','isDeleted', 'note')
      console.log(typeof data, "tipe data");
      db.query(`INSERT INTO tb_child1 SET?`, data, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  editchild1: function (data) {
    return new Promise((resolve, reject) => {
      let editData = {
        id: data.id,
        accountID: data.accountID,
        accountName: data.accountName,
        accountParent: data.accountParent,
        modifiedBy: data.modifiedBy,
        note: data.note,
      };

      // console.log(editData.accountParent.toUpperCase(), " ini edit data");
      db.query(
        `UPDATE tb_child1 SET ? where id='${editData.id.trim()}';`,
        editData,
        (err, res) => {
          if (!err) {
            resolve(res);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  activationchild1: function (data) {
    return new Promise((resolve, reject) => {
      console.log(data,' ini data')
      if (data.removedBy) {
        const setData = {
          removedBy: data.removedBy,
          isDeleted: data.isDeleted,
        };
        console.log(setData)
        db.query(
          `UPDATE tb_child1 SET? where id='${data.id.trim()}';`,
          setData,
          
          (err, res) => {
            if (!err) {
              resolve(res);
            } else {
              reject(new Error(err));
            }
          }
        );
      } else if (data.modifiedBy) {
        const setData = {
          modifiedBy: data.modifiedBy,
          isDeleted: data.isDeleted,
          removedBy: null
        };
        db.query(
          `UPDATE tb_child1 SET? where id='${data.id.trim()}';`,
          setData,

          (err, res) => {
            if (!err) {
              resolve(res);
            } else {
              reject(new Error(err));
            }
          }
        );
      }
    });
  },
};
