require('dotenv').config()

const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose')
const Post = require('./models/Content')

const typeDefs = gql`
    type Post {
        id: ID!,
        body:  String!, 
        username: String
    }
    type Query{
        getPosts: [Post]
    }
`


const resolvers = {
    Query : {
        async getPosts() {
            try {
                const posts = await Post.find()
                return posts
            } catch (error) {
                throw new Error(error)
            }
        }
    }
}

const server = new ApolloServer ({
    typeDefs, resolvers
})
 
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('DB connected succesfully')
        server.listen({port: 5000})     
    }).then(() => {
                console.log(`server is running `)
            })
