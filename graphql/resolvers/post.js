const Post = require('../../models/Content');
const checkAuth = require('../../Util/check_auth')

module.exports = { Query : {
    async getPosts() {
        try {
            const posts = await Post.find()
            return posts
        } catch (error) {
            throw new Error(error)
        }
    }, 
    async getPost(_, {postID}, context, info) {
        try {
            const post = Post.findById(postID)
            if (post){
                return post
            } else {
                throw new Error('Post not found')  
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}, Mutation: {
    async createPost(_, {body}, context, info) {
        const user = checkAuth(context)
        console.log(user)
        const new_post = Post({body, user : user.id, username: user.username})
        const res = await new_post.save()

        return res.json()

    }
}
}