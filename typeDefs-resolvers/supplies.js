const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Supply{
        id: ID!
        team: Int
    }
`
const resolvers = {
    Query: {
        supplies: (parents, args) => dbWorks.getSupplies(args),
        supply: (parents, args) => dbWorks.getSupplies(args)[0]
    },
    Mutation: {
        deleteSupply: (parents, args) => dbWorks.deleteItem('supplies', args)
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}