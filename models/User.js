const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: string,
    password: user, 
    email: string
},
{timestamps: true})

module.exports = mongoose.model('User Model', UserSchema)