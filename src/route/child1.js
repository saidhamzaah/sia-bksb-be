const router = require("express").Router();
const child1Controller = require("../controller/child1");
const { authentication } = require("../middleware/authentication");

router
  .get("/all", authentication, child1Controller.searchchild1ByParent)
  .get("/byparent", authentication, child1Controller.searchchild1ByParent)
  .post("/create", authentication, child1Controller.createchild1)
  .patch("/edit", authentication, child1Controller.editchild1)
  .patch("/activation", authentication, child1Controller.activationchild1);
module.exports = router;
