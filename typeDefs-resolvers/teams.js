const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Team {
        id: ID!
        manager: String!
        office: String
        extension_number: String
        mascot: String
        cleaning_duty: String!
        project: String
        members: [People]
    }
    input PostTeamInput {
        manager: String!
        office: String
        extension_number: String
        mascot: String,
        cleaning_duty: String!
        project: String
    }
`
const resolvers = {
    Query: {
        teams: (parents, args) => dbWorks.getTeams(args),
        team: (parents, args) => dbWorks.getTeams(args)[0]
    },
    Mutation: {
        postTeam: (parents, args) => dbWorks.postTeam(args),
        editTeam: (parents, args) => dbWorks.editTeam(args),
        deleteTeam: (parents, args) => dbWorks.deleteItem('teams', args)
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}