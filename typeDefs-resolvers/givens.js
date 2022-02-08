const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks')
const typeDefs = gql`
    union Given = Equipment | Supply
`
//given에는 Equipment나 Supply가 들어올 수 있음. 
//한 배열에 한가지 이상 타입을 반환할 때 사용하는 Union type


const resolvers = {
    Query: {
        givens: (parents, args) => {
            return [
                ...dbWorks.getEquipments(args),
                ...dbWorks.getSupplies(args)
            ]
        }
    },
    Given: {
        __resolveType(given, context, info) {
            if (given.used_by) {
                return 'Equipment'
            }
            if (given.team) {
                return 'Supply'
            }
            return null
        }
    },
    Mutation: {

    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}