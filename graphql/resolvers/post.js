const Post = require('../../models/Content');

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
}
}