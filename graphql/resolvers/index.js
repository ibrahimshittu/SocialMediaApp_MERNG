const postResolvers = require('./post')
const userResolvers = require('./user')
const commentResolvers = require('./comments')
const likeResolvers = require('./likes')

module.exports = {
    Query: {
        ...postResolvers.Query
    }, 
    Mutation : {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation,
        ...likeResolvers.Mutation
    }
}