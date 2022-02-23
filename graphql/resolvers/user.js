require('dotenv').config

const User = require('../../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server');
const { validateRegisterInput } = require('../../Util/validators');

module.exports = { Mutation : {
        async register(_, {registerInput: {username, email, password, confirmPassword}}, context, info) {
            // console.log(password, confirmPassword)
            const {valid, errors} = validateRegisterInput(username, email, password, confirmPassword) 
            if (!valid) {
                throw new UserInputError('Errors', errors)
            }
            

            const findUser = await User.findOne({username})
            if (findUser) {
                throw new UserInputError('username already exists', {
                    error : {
                        username: 'This username is taken'
                    }
                })
            }

            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({
                email, username, hashedPassword
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