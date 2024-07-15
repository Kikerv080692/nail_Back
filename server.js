const mongoose = require('mongoose')
const app = require('./app')


const {db_host, port = 4000} = process.env 
mongoose.set('strictQuery', true)
mongoose.connect(db_host).then(() => {
    app.listen(port)
    console.log('dataBase connection successful')
}).catch((error) => {
    console.log(error.message)
    process.exit(1)
})