require('dotenv').config

const User = require('../../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server');
const { validateRegisterInput, validateLogin } = require('../../Util/validators');

module.exports = { Mutation : {

        async login(_, {username, password}, context, info) {
            const {valid, errors} = validateLogin(username, password) 
            if (!valid) {
                throw new UserInputError('Errors', errors)
            }

            const user = await User.findOne({username})
            if (!user) {
                errors.general = `User not found`
                throw new UserInputError('Errors', errors)
            }
            
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong crendetials';
                throw new UserInputError('Wrong crendetials', { errors });
            }

            const token = jwt.sign({
                id: user.id, 
                username: user.username, 
                email: user.email
            }, process.env.SECRET_KEY, {expiresIn: '24h'})

            return {
                ...user._doc, 
                id: user._id,
                token
            }
        },

        async register(_, {registerInput: {username, email, password, confirmPassword}}, context, info) {
            
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
                username, password : hashedPassword, email
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