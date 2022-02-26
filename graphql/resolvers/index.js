const postResolvers = require('./post')
const userResolvers = require('./user')
const commentResolvers = require('./comments')
const likeResolvers = require('./likes')

module.exports = {
    Post : {
        likeCount: (parent) => {
            return parent.likes.length
        },
        commentCount: (parent) => {
            return parent.comments.length
        }
    },
    Query : {
        ...postResolvers.Query
    }, 
    Mutation : {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation,
        ...likeResolvers.Mutation
    }, Subscription :{
        ...postResolvers.Subscription
    }
}