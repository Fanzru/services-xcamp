const Joi = require('joi');

const RegisterValidation = data => {
  const Schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
  return Schema.validate(data);
}
const LoginValidation = data => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
  return Schema.validate(data);
}
module.exports = {
  RegisterValidation,
  LoginValidation
}