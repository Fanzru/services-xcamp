const Response = (res,status,code,message,data) => {
  let resData
  if (status) resData = data
  else {
    if (data == null || data == "") resData = {}
    else resData = data
  }
  let response = {
    success : status,
    message : message,
    code : code,
    data : resData
  }
  console.log(response)
  res.status(code).send({response})
}

// digunakan untuk membuat error baru
const CustomError  = (message , status) => {
  const err = new Error(message)
  err.status = status
  return err
}


module.exports = {
  Response,
  CustomError
}