const jwt = require('jsonwebtoken')

require('dotenv').config()

async function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 60 * 10})
}

module.exports = {
  generateAccessToken
}