const router = require("express").Router();
const listaccountController = require("../controller/listaccount");
const { authentication } = require("../middleware/authentication");
// const upload = require('../middlewares/multer')

router
  .get("/all", authentication, listaccountController.showAllListAccount)
  .post("/create", authentication, listaccountController.createListAccount)
  .patch("/edit", authentication, listaccountController.editListAccount)
  .patch("/delete", authentication, listaccountController.deleteListAccount)
  .patch(
    "/activate",
    authentication,
    listaccountController.activateListAccount
  );
module.exports = router;
