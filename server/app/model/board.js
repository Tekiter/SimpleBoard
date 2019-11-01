const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'board name required'],
        trim: true
    },
    owner: {
        username: { type: String }
    },
    permissions: {
        read: { type: Number, default: 1 },
        write: { type: Number, default: 1}
    }

})

boardSchema.plugin(autoIncrement.plugin, {
    model: 'board',
    startAt: 1
})
module.exports = mongoose.model('board', boardSchema)