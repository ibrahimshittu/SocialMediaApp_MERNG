require('dotenv').config()

const { ApolloServer } = require('apollo-server')
const {PubSub} = require('graphql-subscriptions')
const mongoose = require('mongoose')
const typeDefs  = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const pubsub = new PubSub()

const server = new ApolloServer ({
    typeDefs, resolvers, context: ({req}) => ({req, pubsub})
})
 
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('DB connected succesfully')
        server.listen({port: 5000})     
    }).then(() => {
                console.log(`server is running `)
            })
