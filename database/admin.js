const Admin = require('../models/admin')
const {encryptPass,isValid} = require('../utils/encrypt')

async function createAdmin(dataAdmin){
  const cekAdmin = await Admin.count({where: {email: dataAdmin.email}});
  if (cekAdmin !== 0) return "Exist"
  return Admin.create({
    name: dataAdmin.name,
    email: dataAdmin.email,
    password: encryptPass(dataAdmin.password)
  })
}

async function getAllAdmin(){
  return Admin.findAll()
}

async function loginAdmin(dataAdmin){
  const data = await Admin.findOne({
    where: {
      email: dataAdmin.email
    }
  })
  if (data === null) return "Failed"
  const success = isValid(dataAdmin.password,data.password)

  if (success) {
    return data
  } else {
    return "Failed"
  }
}

async function deleteAdmin(adminId){
  return Admin.destroy({where: {id: adminId}})
}

module.exports = {
  createAdmin,
  getAllAdmin,
  loginAdmin,
  deleteAdmin
}