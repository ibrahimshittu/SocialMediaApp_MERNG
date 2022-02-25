const jwt = require('jsonwebtoken')
const {AuthenticationError} = require('apollo-server')
require('dotenv').config

module.exports = (context) => {
    const authHeader = context.req.headers.Authorization || context.req.headers.authorization 
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if(token){
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY)
                return user
            } catch (error) {
                throw new AuthenticationError('invalid or expired token')
                
            }
        } 
            throw new Error('Authentication must be passed correctly')
        
    } 
        throw new Error('user must be Authenticated ')
}