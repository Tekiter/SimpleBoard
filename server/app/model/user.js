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
    password_hash: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    permissionLevel: { type: Number, default: 1 },
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

userSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password_hash)
}


module.exports = mongoose.model('user', userSchema)