const Post = require('../../models/Content');
const checkAuth = require('../../Util/check_auth')
const {UserInputError} = require('apollo-server')


module.exports = {
    Mutation: {
        async likePost(_, {postId}, context) {
            const {username} = checkAuth(context)
            const post = await Post.findById(postId)
            if(post){
                if(post.likes.find(like => like.username === username)){
                    post.likes = post.likes.filter(like => like.username !== username)
                } else {
                    post.likes.push({username})
                }
                await post.save()
                return post
            } else {
                throw new UserInputError("This post does not exist")
            }
        }
    }
}