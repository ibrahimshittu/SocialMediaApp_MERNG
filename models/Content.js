const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    body: String,
    username: String, 
    comments: [
        {
            body: String, 
            username: String
        }, 
        {timestamps: true}
    ],
    likes: [
        {
            username: String
        },
        {timestamps: true}
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'users'
    }
},
{timestamps: true})

module.exports = mongoose.model('post', PostSchema)