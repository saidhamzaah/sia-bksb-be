const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
module.exports = {
  showAllUser: async function (req, res) {
    try {
    //   const { userEmail } = req.params;
      const result = await userModel.showAllUser();
      res.status(200).send({
        data: result,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
};
