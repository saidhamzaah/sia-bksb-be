const child1Model = require("../model/child1");
const { response } = require("../helper/response");
const authModel = require("../model/auth");
const { generateID } = require("../helper/idtimestamp");

module.exports = {
  searchchild1ByParent: async function (req, res) {
    try {
      const { accountParent, isDeleted } = req.body;
      console.log(isDeleted, " ono iosdelete");
      const result = await child1Model.searchchild1ByParent(
        accountParent,
        isDeleted
      );
      if (result[0]) {
        return response(res, 200, { data: result, message: "child 1 Data" });
      } else {
        console.log(result[0], "ini result");
        return response(res, 404, { message: " Data Empty" });
      }
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  createchild1: async function (req, res) {
    try {
      const checkUser = await authModel.authchecker(req.token);
      const createdBy = checkUser[0].id;
      const { accountID, accountName, accountParent, note } = req.body;

      const setData = {
        id: generateID("bksbsia-child1"),
        accountID: accountID,
        accountName: accountName,
        accountParent: accountParent,
        createdBy: createdBy,
        isDeleted: false,
        note: note,
      };

      if (!checkUser[0]) {
        return response(res, 403, { message: "Your Account Are Restricted" });
      }

      const result = await child1Model.createchild1(setData);
      console.log(result, "ini result");
      response(res, 200, { data: result, message: `${accountName} Saved` });
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  editchild1: async function (req, res) {
    try {
      const checkUser = await authModel.authchecker(req.token);
      const modifiedBy = checkUser[0].id;
      const { id, accountID, accountName, accountParent, note } = req.body;

      const setData = {
        id,
        accountID,
        accountName,
        accountParent,
        modifiedBy,
        note,
      };

      if (!checkUser[0]) {
        return response(res, 403, { message: "Your Account Are Restricted" });
      }

      const result = await child1Model.editchild1(setData);
      console.log(result, "ini result");
      response(res, 200, { data: result, message: `${accountName} Saved` });
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  activationchild1: async function (req, res) {
    try {
      const checkUser = await authModel.authchecker(req.token);
      const { id, isDeleted } = req.body;

      console.log(checkUser)
      if (!checkUser[0]) {
        return response(res, 403, { message: "Your Account Are Restricted" });
      }
      let setData;
      if (isDeleted.toLowerCase() == "true") {
        const removedBy = checkUser[0].id;
        setData = {
          id,
          removedBy,
          isDeleted:true
        };
      } else {
        const modifiedBy = checkUser[0].id;
        setData = {
          id,
          modifiedBy,
          isDeleted:false
        };
      }
      // console.log(setData, "ini setdata");
      const result = await child1Model.activationchild1(setData);
      // console.log(result, "ini result");
      response(res, 200, { data: result, message: (setData.removedBy) ? "Data Deactivate":"Data Activated" });
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
};
