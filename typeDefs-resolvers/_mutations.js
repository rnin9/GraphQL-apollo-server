const { gql } = require('apollo-server')

const typeDefs = gql`
    type Mutation{
        deleteEquipment(id: String): Equipment
        deleteSupply(id: String): Supply
        deletePeople(id: String): People
        postPerson(input: PostPersonInput): People!
        postTeam(input: PostTeamInput!): Team!
        postEquipment(
            id: ID!,
            used_by: Role!,
            count: Int,
            new_or_used: NewOrUsed!
        ): Equipment!
        increaseEquipment(
            id: ID!,
        ): Equipment!
        editTeam(
            id: ID!,
            input: PostTeamInput
        ): Team!
        deleteTeam(id:ID!): Team!
    }
`
module.exports = typeDefs