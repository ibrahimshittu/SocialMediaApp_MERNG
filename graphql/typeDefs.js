const gql = require('graphql-tag')

const typeDefs = gql`
    type Post {
        id: ID!,
        body:  String!, 
        username: String
    }

    type User {
        id: ID!,
        email: String!,
        username: String!,
        token: String!
    }
    input registerInput {
        username: String!,
        password: String!, 
        confirmPassword: String!
        email: String!
    }

    type Mutation {
        register( registerInput: registerInput): User!
    }
    type Query{
        getPosts: [Post]
    }
`

module.exports = typeDefs;