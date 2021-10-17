const Joi = require('joi')

const schemaAdmin = Joi.object().keys({
  nama : Joi.string().min(3).required(),
  email : Joi.string().email().required(),
  password : Joi.string().required().min(8),
})

module.exports = {
  schemaAdmin,
}