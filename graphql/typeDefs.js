const gql = require('graphql-tag')

const typeDefs = gql`
    type Comment {
        id: ID!,
        username: String!, 
        body: String!
    }

    type Like {
        id: ID!,
        username: String!
    }

    type Post {
        id: ID!,
        body:  String!, 
        username: String!,
        comments: [Comment]!,
        likes: [Like]!
    }

    type User {
        id: ID!,
        email: String!,
        username: String!,
        token: String!,
        createdAt: String!
    }
    input registerInput {
        username: String!,
        password: String!, 
        confirmPassword: String!
        email: String!
    }

    type Mutation {
        register( registerInput: registerInput): User!,
        login(username: String, password: String): User!
        createPost(body: String!) : Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!) : Post!
        deleteComment(postId: String!, commentId: ID!) : Post!
        likePost(postId: ID!): Post!
    }
    type Query{
        getPosts: [Post]
        getPost(postID: ID!) : Post!
    }
`

module.exports = typeDefs;