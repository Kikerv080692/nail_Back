const express = require('express')
const controlWrapper = require('../middlewares/controlWrapper')
const auth = require('../middlewares/auth')
const register = require('../controlers/register')
const login = require('../controlers/login')
const router = express.Router()

router.post('/register', controlWrapper(register))
router.post('/login', controlWrapper(login))

module.exports = router