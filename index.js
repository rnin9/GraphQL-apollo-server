const { ApolloServer } = require('apollo-server')
const queries = require('./typeDefs-resolvers/queries')
const mutations = require('./typeDefs-resolvers/mutations')
const equipments = require('./typeDefs-resolvers/equipments')
const supplies = require('./typeDefs-resolvers/supplies')

// GraphQL 명세에 사용될 데이터, 요청의 타입 지정 gql(template literal tag)로 생성됨
const typeDefs = [
    queries,
    mutations,
    equipments.typeDefs,
    supplies.typeDefs,
]

//서비스의 action들을 함수로 지정. 요청에 따라 데이터를 반환, 입력, 수정, 삭제
const resolvers = [
    equipments.resolvers,
    supplies.resolvers,
]
const server = new ApolloServer({ typeDefs, resolvers })
// typedef와 resolver를 인자로 받아, Apollo Server를 생성

server.listen().then(({ url }) => {
    console.log(` Server Ready At ${url}`)
})