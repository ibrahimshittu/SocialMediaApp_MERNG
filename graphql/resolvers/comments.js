const Post = require('../../models/Content');
const checkAuth = require('../../Util/check_auth')
const {AuthenticationError} = require('apollo-server')
const {UserInputError} = require('apollo-server')

module.exports = {
    Mutation: {
        async createComment(_, {postId, body}, context) {
        const {username} = checkAuth(context)
        if(body.trim() === ""){
            throw new UserInputError("This field cannot be empty", {
                errors: {
                    body: "This input cannot be empty"
                }
            })
        }

        const post = await Post.findById(postId)
        if(post){
            post.comments.unshift({
                body, 
                username
            })
            await post.save()
            return post
        } else {
            throw new UserInputError("This post does not exist")
        }
    }, 
    async deleteComment(_, {postId, commentId}, context) {
        const {username} = checkAuth(context)
        const post = await Post.findById(postId)
        if(post){
            const commentIndex = post.comments.findIndex(comment => comment.id === commentId)
            if(commentIndex === -1){
                throw new UserInputError("This comment does not exist")
            }
            if(post.comments[commentIndex].username !== username){
                throw new AuthenticationError("Action not allowed")
            }
            post.comments.splice(commentIndex, 1)
            await post.save()
            return post
        }

    },
    }
}