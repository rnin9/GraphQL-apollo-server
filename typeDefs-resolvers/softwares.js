const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')
const typeDefs = gql`
    type Software implements Tool{
        id: ID!
        used_by: Role!
        developed_by: String!
        description: String
    }
`
const resolvers = {
    Query: {
        softwares: (parents, args) => dbWorks.getSoftwares(args),
        software: (parents, args) => dbWorks.getSoftwares(args)[0]
    },
    Mutation: {}
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}