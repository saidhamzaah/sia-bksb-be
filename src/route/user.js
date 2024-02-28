const router = require('express').Router()
const userController = require('../controller/user')
const { authentication } = require('../middleware/authentication')
// const upload = require('../middlewares/multer')

router
    .get('/all', authentication, userController.showAllUser)
    
module.exports = router