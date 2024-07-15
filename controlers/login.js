const User = require('../models/user')
const {Unauthorized} = require('http-errors')
const createToken = require('../helpers/createToken')
const bcrypt = require('bcryptjs') 

const login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    const passwordCompare = bcrypt.compareSync(password, user.password)
    if(!user || !passwordCompare){
        throw Unauthorized('email or password is wrong')
    }
    const payload = {id: user._id}
    const token = createToken(payload)
    await User.findByIdAndUpdate(user._id, {token})
    res.status(200).json({message: "login completed successful", 
        dataUser: {
            name: user.name,
            email: user.email,
            token
        }})

}

module.exports = login