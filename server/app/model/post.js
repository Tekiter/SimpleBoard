const mongoose = require('mongoose')
const Types = mongoose.Schema.Types
const autoIncrement = require('mongoose-auto-increment')

const postSchema = new mongoose.Schema({
    board: {
        type: Number,
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
    ],
    created: {
        type: Date,
        default: Date.now
    }
    
})

postSchema.set('toObject', { virtuals: true })
postSchema.set('toJSON', { virtuals: true })

postSchema.virtual('likes_count').get(function() {
    
    return this.likes ? this.likes.length : 0
})

postSchema.virtual('comments_count').get(function() {
    return this.comments ? this.comments.length : 0
})

postSchema.plugin(autoIncrement.plugin, {
    model: 'post',
    startAt: 1
})
module.exports = mongoose.model('post', postSchema)