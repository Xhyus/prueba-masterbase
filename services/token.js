const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign({ user }, "secreto")
}

const validateToken = (token) => {
    return jwt.verify(token, "secreto")
}

module.exports = {
    generateToken,
    validateToken
}