const User = require('../models/user')
const {Conflict} = require('http-errors')
const createToken = require('../helpers/createToken')

const register = async (req, res) => {
    const {name, email, password} = req.body
    const user = await User.findOne({email})
    if(user){
        throw new Conflict('email in use')
    }
    const newUser = new User({name, email})
    await newUser.setPassword(password) 
    const payload = {
        id: newUser._id,
    }
    const token = createToken(payload)
    newUser.token = token
    await newUser.save()
    res.status(201).json({
        message: 'registration completed successfully ',
        dataUser: {
            name: newUser.name,
            email: newUser.email,
            token: newUser.token,
        } 
    })
}


module.exports = register