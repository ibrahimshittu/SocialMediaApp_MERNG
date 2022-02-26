const Post = require('../../models/Content');
const checkAuth = require('../../Util/check_auth')
const {AuthenticationError, UserInputError} = require('apollo-server')


module.exports = { Query : {
    async getPosts() {
        try {
            const posts = await Post.find().sort({createdAt: -1})
            return posts
        } catch (error) {
            throw new Error(error)
        }
    }, 
    async getPost(_, {postId}, context, info) {
        try {
            const post = Post.findById(postId)
            if (post){
                return post
            } else {
                throw new UserInputError('Post not found')  
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}, Mutation: {
    async createPost(_, {body}, context, info) {
        const user = checkAuth(context)
        if(args.body.trim() === ""){
            throw new UserInputError("Body cannot be empty")
        }
        const new_post = Post({body, user : user.id, username: user.username})
        const res = await new_post.save()
        pubsub.publish('NEW_POST', { newPost: res });
        return res
    }, 
    async deletePost(_, {postId}, context, info){
        const user = checkAuth(context)

        try {
            const post = await Post.findById(postId)
            if(!post){
                return `Post with ID ${postId} does not exist`
            }
            if(post.username === user.username) {
                await post.delete()
                return "Post successfully deleted"
            } else {
                throw new AuthenticationError("You cannot delete this post")
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}, Subscription: {
    newPost: {
        subscribe: (_,__, {pubsub}) => pubsub.asyncIterator('NEW_POST')
    }
}
}
