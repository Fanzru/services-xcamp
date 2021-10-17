const Admin = require('../models/admin')
const {encryptPass,isValid} = require('../utils/encrypt')

async function createAdmin(dataAdmin){
  return Admin.create({
    email: dataAdmin.email,
    password: encryptPass(dataAdmin.password)
  })
}

module.exports = {
  createAdmin
}