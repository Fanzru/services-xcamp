const jwt = require('jsonwebtoken')
const {Response} = require('../utils/response')
const {generateAccessToken} = require('../utils/authentication')

require('dotenv').config()
let refreshTokens = []


async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return Response(res,false,401, 'Authentication Not Found')
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return Response(res,false,419, 'Authentication Has Expired')
    req.user = user
    next()
  })
}

async function createTokenLogin(email) {
  const user = {name: email}
  console.log('-----------------------')
  const accessToken = await generateAccessToken(user)

  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  refreshTokens.push(refreshToken)

  return {accessToken: accessToken, refreshToken: refreshToken}
}



module.exports = {
  authenticateToken,
  createTokenLogin
}