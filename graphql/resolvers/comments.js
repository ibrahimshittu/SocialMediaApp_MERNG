const Post = require('../../models/Content');
const checkAuth = require('../../Util/check_auth')
const {AuthenticationError} = require('apollo-server')

module.exports = {
    Mutation: {
        async createComment(_, {postId, body}, context) {
        
    }
    }
}