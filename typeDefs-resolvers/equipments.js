const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')

const typeDefs = gql`
    type Equipment implements Tool{
        id: ID!
        used_by: Role!
        count: Int
        new_or_used: NewOrUsed!
    }
    type EquipmentAdv{
        id: ID!
        used_by: Role!
        count: Int!
        use_rate: Float
        is_new: Boolean!
    }
`
//ID === String이지만, 데이터의 고유 식별자.
//! === non - null 
const resolvers = {
    Query: {
        equipments: (parent, args) => dbWorks.getEquipments(args),
        equipment: (parent, args) => dbWorks.getEquipments(args)[0],
        equipmentAdvs: (parent, args) =>
            dbWorks.getEquipments(args)
                .map((equipment) => {
                    if (equipment.used_by === 'developer') {
                        equipment.use_rate = Math.random().toFixed(2)
                    }
                    equipment.is_new = equipment.new_or_used === 'new'
                    return equipment
                })
    },
    Mutation: {
        deleteEquipment: (parent, args) => dbWorks.deleteItem('equipments', args),
        postEquipment: (parent,args) => dbWorks.postEquipment(args),
        increaseEquipment: (parent, args) => dbWorks.increaseEquipment(args)
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}
