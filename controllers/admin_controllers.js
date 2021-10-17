// Query Database
const {
  createAdmin,
  getAllAdmin,
  loginAdmin
} = require('../database/admin')

// Format Response
const {Response} = require('../utils/response')

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
  if (!dataAdmin) return Response(res, false, 400, "Admin Not Found")
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
  Response(res,true,200, "Login Success", dataAdmin)


}

async function DeleteAdminById(req,res){}

async function ChangePassword(req,res){}


module.exports = {
  RegisterAdmin,
  GetAllAdmin,
  LoginAdmin
}