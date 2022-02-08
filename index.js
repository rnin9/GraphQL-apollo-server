const database = require('./database');
const { ApolloServer, gql } = require('apollo-server');

// GraphQL 명세에 사용될 데이터, 요청의 타입 지정 gql(template literal tag)로 생성됨
const typeDefs = gql`
 type Query{
     teams: [Team]
     team(id: Int): Team
     equipments: [Equipment]
     supplies: [Supply]
 }
 type Team{
     id: Int
     manager: String
     office: String
     extension_number: String
     mascot: String
     cleaning_duty: String
     project: String
     supplies: [Supply]
 }
 type Equipment{
     id: String
     used_by: String
     count: Int
     new_or_used: String
 }
 type Supply{
     id: String
     team: Int
 }
`
//서비스의 action들을 함수로 지정. 요청에 따라 데이터를 반환, 입력, 수정, 삭제
const resolvers = {
    Query: {
        teams: () => database.teams.map((team)=>{
            team.supplies = database.supplies.filter((supply)=>{
                return supply.team === team.id
            })
            return team
        }),
        //id기준으로 team 1개 가져오기 + supply
        team: (parent, args, context, info) => database.teams.filter((team) => {
            if(team.id === args.id){
                team.supplies = database.supplies.filter((supply)=>{
                    return supply.team === team.id
                })
            }
            return team.id === args.id
        })[0],
        equipments: () => database.equipments,
        supplies: () => database.supplies
    }
}
const server = new ApolloServer({ typeDefs, resolvers })
// typedef와 resolver를 인자로 받아, Apollo Server를 생성

server.listen().then(({ url }) => {
    console.log(` Server Ready At ${url}`)
})