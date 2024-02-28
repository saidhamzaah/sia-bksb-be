const listaccountModel = require("../model/listaccount");
const { response } = require("../helper/response");
const authModel = require("../model/auth");
const { validationResult } = require("express-validator");

module.exports = {
  showAllListAccount: async function (req, res) {
    try {
      const { userEmail } = req.token;
      // console.log(userEmail, "cek data");

      const creatorID = await authModel.authidtaker(userEmail);
      // console.log(creatorID, "ini id nya");
      const result = await listaccountModel.showAllListAccount();
      response(res, 200, {
        data: result,
        message: "List Account Data Received",
      });
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  createListAccount: async function (req, res) {
    try {
      //---------------------- Take User ID--------------------
      const checkUser = await authModel.authchecker(req.token);
      const createdBy = checkUser[0].id;
      // console.log(createdBy, "cek user");

      // ------------------ Is The ID Has Permission----------------
      if (!checkUser[0]) {
        return response(res, 403, { message: "Your Account Are Restricted" });
      }
      const { id, accountID, accountName, note, type } = req.body;
      const isDeleted = false;
      //---------------Check List Account ID-----------------
      const checkListAccountData = await listaccountModel.checkListAccount(
        accountID
      );
      if (checkListAccountData[0]) {
        // console.log(checkListAccountData, "ini cek data list account");
        return response(res, 403, {
          message:
            "The Account ID Already Registered, Please Delete the Exist Account ID or Change Account ID",
        });
      }
      const newData = {
        accountID,
        accountName,
        createdBy,
        isDeleted,
        note,
        type,
      };
      // console.log(newData, "data baru");
      const result = await listaccountModel.createListAccount(newData);
      response(res, 200, { data: result, message: "List Account Data Saved" });
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  editListAccount: async function (req, res) {
    try {
      const { id, accountID, accountName, note, type } = req.body;
      //---------------------- Take User ID--------------------
      const checkUser = await authModel.authchecker(req.token);
      const modifiedBy = checkUser[0].id;
      // console.log(modifiedBy, "cek user");
      // ------------------ Is The ID Has Permission----------------
      if (!checkUser[0]) {
        return response(res, 403, { message: "Your Account Are Restricted" });
      }

      const checkListAccountData = await listaccountModel.searchListAccountID(
        id
      );
      // console.log(checkListAccountData[0].id, " list akun");
      const accID = checkListAccountData[0].id;
      if (!checkListAccountData[0]) {
        return response(res, 403, {
          message: "List Account Not Found or Invalid Data",
        });
      }
      let setData = {
        accID,
        accountID,
        accountName,
        modifiedBy,
        note,
        type,
      };

      const result = await listaccountModel.editListAccount(setData);
      response(res, 200, result);
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  deleteListAccount: async function (req, res) {
    try {
      const { id,accountID } = req.body;
      //---------------------- Take User ID--------------------
      const checkUser = await authModel.authchecker(req.token);
      const removedBy = checkUser[0].id;
      // ------------------ Is The ID Has Permission----------------
      if (!checkUser[0]) {
        return response(res, 403, { message: "Your Account Are Restricted" });
      }

      const checkListAccountData = await listaccountModel.searchListAccountID({
        id,
        isDeleted: false,
      });
      // console.log(checkListAccountData,'ini')
      const accID = checkListAccountData[0].id;
      if (!checkListAccountData[0]) {
        return response(res, 403, {
          message: "List Account Not Found or Invalid Data",
        });
      }
      const setData = { id: accID, removedBy: removedBy };
      const result = await listaccountModel.deleteListAccount(setData);
      response(res, 200, result);
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  activateListAccount: async function (req, res) {
    try {
      const { id,accountID } = req.body;
      //---------------------- Take User ID--------------------
      const checkUser = await authModel.authchecker(req.token);
      const modifiedBy = checkUser[0].id;
      // ------------------ Is The ID Has Permission----------------
      if (!checkUser[0]) {
        return response(res, 403, { message: "Your Account Are Restricted" });
      }

      const checkListAccountData = await listaccountModel.searchListAccountID({
        id,
        isDeleted: true,
      });
      const accID = checkListAccountData[0].id;
      // console.log(accID, "ceklisakun");
      if (!checkListAccountData[0]) {
        return response(res, 403, {
          message: "List Account Not Found or Invalid Data",
        });
      }
      const setData = { id: accID, modifiedBy: modifiedBy };
      // console.log(setData, "ini setdata");
      const result = await listaccountModel.activateListAccount(setData);
      response(res, 200, result);
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
};
