require('dotenv').config

const User = require('../../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = { Mutation : {
        async register(_, {registerInput: {username, email, password, confirmPassword}}, context, info) {
            const pass = await bcrypt.hash(password, 12)

            const user = new User({
                email, username, pass
            })

            const res = await user.save()

            const token = jwt.sign({
                id: res.id, 
                username: res.username, 
                email: res.email
            }, process.env.SECRET_KEY, {expiresIn: '3d'})

            return {
                ...res._doc, 
                id: res._id,
                token
            }
        }

}
}