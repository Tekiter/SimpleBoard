const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    username: String,
    password_hash: String,
    nickname: String,
    email: String,
    permissionLevel: Number,
    registered_date: { type: Date, default: Date.now }
})



// userSchema.statics.create = function (obj) {
    
//     let user = new userModel({
//         username: "helloworld",
//         password: "helloworld",
//         email: "helloworld@helloworld.com"
//     })

//     user.save()
// }



module.exports = mongoose.model('user', userSchema)