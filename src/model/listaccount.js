const db = require("../helper/db");
const {generateID}=require("../helper/idtimestamp")
module.exports = {
  searchListAccountID: function ({ id, isDeleted }) {
    return new Promise((resolve, reject) => {
      // console.log(result, "ini id");
      if (isDeleted) {
        db.query(
          `SELECT * FROM tb_listaccount WHERE id='${id.trim()}' and isDeleted=${isDeleted}`,
          (err, result) => {
            if (!err) {
              resolve(result);
            } else reject(new Error(err));
          }
        );
      } else {
        db.query(
          `SELECT * FROM tb_listaccount WHERE id='${id.trim()}'`,
          (err, result) => {
            if (!err) {
              resolve(result);
            } else reject(new Error(err));
          }
        );
      }
    });
  },
  showAllListAccount: function () {
    return new Promise((resolve, reject) => {
      db.query(`select * from tb_listaccount`, (err, result) => {
        if (!err) resolve(result);
        else reject(new Error(err));
      });
    });
  },
  checkListAccountData: function (id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from tb_listaccount where id = "${id.trim()}" and isDeleted = false`,
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
  checkListAccount: function (accountID) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * from tb_listaccount where accountID = "${accountID.trim()}" and isDeleted = false`,
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
  createListAccount: function (data) {
    return new Promise((resolve, reject) => {
      // ---------------Timestamp ID List Account-------------------------------
      const code= 'bksbsia-listaccount'
      const accID = generateID(code)

      // -------------- insert AccountID and isDeleted-----------------------------------------
      const isDeleted = false;
      const setData = { id: accID, ...data, isDeleted: isDeleted };
      // console.log(setData.type, "ini setdata");

      //--------------- Insert into tb On DB -----------------------------
      db.query(
        `INSERT INTO tb_listaccount(id, accountID, accountName, createdBy, isDeleted, note, type) VALUES (
          '${setData.id.trim()}','${setData.accountID.trim()}','${
          setData.accountName
        }','${setData.createdBy}',
          '${setData.isDeleted}','${setData.note}','${setData.type}')`,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(error));
          }
        }
      );
    });
  },
  editListAccount: function (data) {
    return new Promise((resolve, reject) => {
      let editData = {
        id: data.accID,
        accountID: data.accountID,
        accountName: data.accountName,
        modifiedBy: data.modifiedBy,
        note: data.note,
        type: data.type,
      };

      console.log(editData, " ini edit data");
      db.query(
        `UPDATE tb_listaccount SET ? where id='${editData.id.trim()}';`,
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
  deleteListAccount: function (setData) {
    return new Promise((resolve, reject) => {
      console.log(setData, " ini tes setData");
      db.query(
        `UPDATE tb_listaccount SET isDeleted=true, removedBy='${
          setData.removedBy
        }' where id='${setData.id.trim()}';`,
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
  activateListAccount: function (setData) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE tb_listaccount SET isDeleted=false, modifiedBy='${
          setData.modifiedBy
        }' where id='${setData.id.trim()}';`,
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
};
