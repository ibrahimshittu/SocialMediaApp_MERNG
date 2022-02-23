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
    new_user: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'new_users'
    }
},
{timestamps: true})

module.exports = mongoose.model('new_post', PostSchema)