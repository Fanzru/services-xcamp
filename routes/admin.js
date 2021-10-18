const router = require("express").Router()
const {
  RegisterAdmin,
  GetAllAdmin,
  LoginAdmin,
  DeleteAdminById
} = require('../controllers/admin_controllers')

const {authenticateToken} = require('../controllers/authentication_controllers')

router.route('/register').post(RegisterAdmin)
router.route('/getalladmin').get(authenticateToken,GetAllAdmin)
router.route('/login').post(LoginAdmin)
router.route('/delete').delete(DeleteAdminById)

module.exports = router