const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query{
        equipments: [Equipment],
        equipmentAdvs: [EquipmentAdv],
        softwares: [Software],
        software: Software,
        givens: [Given],
        tools: [Tool],
        people: [People],
        peopleFiltered(
            team: Int,
            sex: Sex,
            blood_type: BloodType,
            from: String,
        ):[People],
        peoplePaginated(
            page: Int!,
            per_page: Int!
        ):[People],
        person: People,
        supplies: [Supply]
    }
`
module.exports = typeDefs
