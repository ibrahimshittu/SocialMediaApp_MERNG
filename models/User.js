const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String, 
    email: String
},
{timestamps: true})

module.exports = mongoose.model('new_user', UserSchema)