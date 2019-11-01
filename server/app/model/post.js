const mongoose = require('mongoose')
const Types = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    board: {
        type: Types.ObjectId,
        ref: 'board'
    },
    title: {
        type: String,
        required: [true, 'post title required'],
        trim: false
    },
    content: {
        type: String,
        required: [true, 'post content required'],
        trim: false
    },
    writer: { 
        type: String,
        required: [true, 'post writer required']
     },
    is_secret: {
        type: Boolean
    },
    comments: [
        {
            content: { type: String },
            writer: { type: String }
        }
    ],
    likes: [
        {
            liker: { type: String }
        }
    ]
    
})


module.exports = mongoose.model('board', postSchema)