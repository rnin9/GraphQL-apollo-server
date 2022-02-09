const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')
const typeDefs = gql`
    type RoleInfo {
        id: ID!
        job: String!
        requirement: String!
    }
`
const resolvers = {
    Query:{
        roles: (parents, args)=> dbWorks.getRoles(args),
        role: (parents, args) => dbWorks.getRoles(args)[0]
    },
    Mutation:{}
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}