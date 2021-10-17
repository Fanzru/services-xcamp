const router = require("express").Router()
const {
  RegisterAdmin,
  GetAllAdmin,
  LoginAdmin
} = require('../controllers/admin_controllers')

router.route('/register').post(RegisterAdmin)
router.route('/getalladmin').get(GetAllAdmin)
router.route('/login').post(LoginAdmin)

module.exports = router