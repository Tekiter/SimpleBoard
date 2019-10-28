const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: String,
    password_hash: String,
    nickname: String,
    email: String,
    registered_date: { type: Date, default: Date.now }
})



module.exports = mongoose.model('user', userSchema)