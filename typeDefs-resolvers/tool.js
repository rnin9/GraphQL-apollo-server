const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')
const typeDefs = gql`
    interface Tool{
        id: ID!
        used_by: Role!
    }
`
const resolvers = {
    Query: {
        tools: (parents, args) => {
            return [
                ...dbWorks.getSoftwares(args),
                ...dbWorks.getEquipments(args)
            ]
        }
    },
    Mutation: {},
    Tool: {
        __resolveType(tool, context, info) {
            if (tool.developed_by) {
                return 'Software'
            }
            if (tool.new_or_used) {
                return 'Equipment'
            }
            return null
        }
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}


// query {
//     tools {
//       __typename
//       id
//       used_by
//       ... on Equipment {
//         id
//         count
//         new_or_used
//       }
//       ... on Software {
//         developed_by
//         description
//       }
//     }
//   }
//