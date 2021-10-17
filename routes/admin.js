const router = require("express").Router()
const {registerAdmin} = require('../controllers/admin_controllers')

router.route('/register').post(registerAdmin)

router.get('/', async (req,res) => {
  res.send("Ananda Affan F")
})
module.exports = router