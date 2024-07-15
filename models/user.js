const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')
const validationError = require('../helpers/validationError')

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: 6
    },
    token: {
        type: String,
        default: ''
    }, 
  
},
{
    versionKey: false,
    timestamps: true,
},)

userSchema.methods.setPassword = async function(password) {
    this.password = await bcrypt.hash(password, 10)
}
userSchema.methods.verifyPassword = function(password){
    return bcrypt.compare(password, this.password)
}

userSchema.post('save', validationError)

const User = model('user', userSchema)


module.exports = User