const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Student {
    id: Int!
    studNo: String!
    password: String
    name: String
    state: Int
    k: Int
    d: Int
    a: Int
    team: String
    score: Int
    grade: Int
  }

  type LoginResponse {
    success: Boolean!
    message: String!
  }

  type Query {
    login(studNo: String!, password: String!): LoginResponse!
    student: Student!
  }
`);

module.exports = schema;