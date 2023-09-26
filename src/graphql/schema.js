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

  type Notice {
    id: Int!
    title: String!
  }

  type Problem {
    title: String!
    lang: String
    result: String
    runtime: Int
    memory: Int
  }

  type submit {
    id: Int!
    stud_id: Int!
    type: String
    problemNo: Int!
    lang: String
    code: String
    state: String
    extra: String
    result: String
  }

  type Query {
    login(studNo: String!, password: String!): LoginResponse!
    student(studNo: String!): Student!
    students: [Student]!
    notices: [Notice!]!
    problems: [Problem]
    submits: [submit]
    info: Student!
  }

  type Mutation {
    updateStudent(state: String, k: Int, d: Int, a: Int): Student!

    updateSubmit(
      stud_id: Int!
      type: String
      problemNo: Int!
      lang: String
      code: String
      state: String
      extra: String
      result: String
    ): submit!
  }
`);

module.exports = schema;