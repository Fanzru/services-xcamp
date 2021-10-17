const {createAdmin} = require('../database/admin')
const {response} = require('../utils/response')

async function registerAdmin(req,res){
  let err
  let payload = req.body
  const dataAdmin = await createAdmin(payload).catch(e => err = e.message)
  if (err) return response(res,false,500, "Internal Server Error")
  if (!dataAdmin) return response(res,false,400, "Register Admin Failed")
  response(res,true,"Register Admin Success",dataAdmin)
}

module.exports = {
  registerAdmin
}