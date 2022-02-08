const { gql } = require('apollo-server')
const typeDefs = gql`
    enum Role {
        developer
        designer
        planner
    }
    enum NewOrUsed {
        new
        used
    }
    enum BloodType {
        A
        B
        AB
        O
    }
    enum Sex {
        male
        female
    }
`

module.exports = typeDefs