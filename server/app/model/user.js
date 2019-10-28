const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt   = require('bcrypt-nodejs')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username required'],
        trim: true,
        unique: true
    },
    password_hash: String,
    nickname: String,
    email: String,
    permissionLevel: Number,
    registered_date: { type: Date, default: Date.now }
})

userSchema.virtual('password')
.set(function (value) {
    this.password_hash = bcrypt.hashSync(value)
})

// userSchema.pre('save', function (next){
//     var user = this;
//     if(!user.isModified('password')){
//       return next();
//     } else {
//       user.password = bcrypt.hashSync(user.password);
//       return next();
//     }
// });


module.exports = mongoose.model('user', userSchema)