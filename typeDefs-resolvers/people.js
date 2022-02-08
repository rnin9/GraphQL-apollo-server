const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')
const typeDefs = gql`
    type People {
        id: ID!
        first_name: String!
        last_name: String!
        sex: Sex!
        blood_type: BloodType!
        serve_years: Int!
        role: Role!
        team: ID!
        from: String!
        tools: [Tool]
        givens: [Given]
    }
`

const resolvers = {
    Query: {
        people: (parents, args) => dbWorks.getPeople(args),
        person: (parents, args) => dbWorks.getPeople(args)[0]
    },
    Mutation: {}

}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}

// query Tools {
//     tools {
//       __typename
//       id
//       used_by
//       ... on Equipment {
//         count
//         new_or_used
//       }
//       ... on Software {
//         developed_by
//         description
//       }
//     }
//   }
// Interface를 이용한 Query