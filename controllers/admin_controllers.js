// Query Database
const {
  createAdmin,
  getAllAdmin,
  loginAdmin,
  deleteAdmin
} = require('../database/admin')

// Format Response
const {Response} = require('../utils/response')
const {createTokenLogin} = require('../utils/authentication')
// Validator Body
const {RegisterValidation, LoginValidation} = require('../validator/admin_validate')

async function RegisterAdmin(req, res) {
  let err
  let payload = req.body

  const {error} = RegisterValidation(payload)
  if (error) return Response(res, false, 400, error.message)

  const dataAdmin = await createAdmin(payload).catch(e => err = e.message)

  if (err) return Response(res, false, 500, "Internal Server Error")

  if (dataAdmin === "Exist") return Response(res, false, 400, "Email Already Used")

  if (!dataAdmin) return Response(res, false, 400, "Register Admin Failed")

  Response(res, true, 200, "Register Admin Success", dataAdmin)

}

async function GetAllAdmin(req, res) {
  let err
  const dataAdmin = await getAllAdmin().catch(e => err = e)
  if (err) return Response(res, false, 500, "Internal Server Error")
  if ((!dataAdmin) ||(dataAdmin.length === 0)) return Response(res, false, 400, "Admin Not Found")
  Response(res,true,200, "Get All Admin Success",dataAdmin)
}

async function LoginAdmin(req,res){
  let err
  const payload = req.body
  const {error} = LoginValidation(payload)
  if (error) return Response(res, false, 400, error.message)
  const dataAdmin = await loginAdmin(payload).catch(e => err = e)
  if (err) return Response(res,false,500,"Internal Server Error")
  if ((!dataAdmin) || (dataAdmin === "Failed")) return Response(res, false, 400, "Login Failed")
  const token = await createTokenLogin(dataAdmin.email)
  Response(res,true,200, "Login Success", token)
}

async function DeleteAdminById(req,res){
  let err
  const adminId = req.body.admin_id
  if (!adminId) return Response(res, false, 400, "admin_id param required")
  const dataAdmin = await deleteAdmin(adminId).catch(e => err = e.message)
  if(err) return Response(res, false, 500, "Internal Server Error")
  if (!dataAdmin) Response(res, false, 400, "Deleted Admin Failed")
  console.log(dataAdmin)
  Response(res, true, 200, "Delete Admin Success", dataAdmin)
}





module.exports = {
  RegisterAdmin,
  GetAllAdmin,
  LoginAdmin,
  DeleteAdminById
}