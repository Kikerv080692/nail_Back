const jwt = require('jsonwebtoken')
const {secretkey} = process.env

const createToken = (payload) => {
    const token = jwt.sign(payload, secretkey, {expiresIn: '24h'})
    return token
}

module.exports = createToken