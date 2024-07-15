const {secretkey} = process.env
const User = require('../models/user')
const {Unauthorized} = require('http-errors')
const jwt = require('jsonwebtoken')


const auth = async (req, _, next) => {
    const {authorization = ''}  = req.headers
    const [bearer, token] = authorization.split('')
    try{
        if(bearer !== 'Bearer' || !token){
            throw Unauthorized('not authorization')
        }
        const {id} = jwt.verify(token, secretkey)
        const user = await User.findById(id)
        if(!user || !user.token || token !== user.token){
            throw Unauthorized('not Unauthorized')
        } 
        req.user = user
        next()
    }catch(error){
        if(error.message === 'Invalid signature'){
            error.status = 401
        }
        next(error)
    }
}
module.exports = auth