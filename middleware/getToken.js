const jwt = require('jsonwebtoken')

const decodeJWT = (jwtRquest='') =>{
    const code = jwtRquest.replace('bearer ', "")
    return jwt.decode(code)
}

module.exports = {
    decodeJWT
}