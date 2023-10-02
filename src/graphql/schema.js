const { buildSchema } = require('graphql');

const schema = buildSchema(`
  scalar JSON
  
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
    rank: Int
    tries: JSON
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
    no: Int!
    title: String!
    body: String!
  }

  type ProblemWithSubmit {
    no: Int!
    title: String
    lang: String
    result: String
    runtime: Int
    memory: Int
    submit_at: String
    score: Int
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
    code_size: Int
    submit_at: String
    runtime: Int
    memory: Int
    score: Int
  }

  type Scoreboard {
    studNo: String
    tries: JSON
  }

  type Try {
    problemNo: Int
    try_cnt: Int
  }

  type ProblemJudgeResult {
    result: ProblemWithSubmit,
    judge: [JudgeResult]
  }

  type JudgeResult {
    id: Int
    submit_id: Int
    testcase_id: Int
    output: String
    runtime: Int
    result: Int
    compile_log: String
    memory: Int
    judge_at: String
    judge_server_id: String
  }

  type Query {
    login(studNo: String!, password: String!): LoginResponse!
    student(studNo: String!): Student!
    students: [Student]!
    notices: [Notice!]!
    problems: [Problem]
    problem(no: Int!): Problem
    problemsWithSubmit: [ProblemWithSubmit]
    problemsWithSubmitByStudId(studId: Int!): [ProblemWithSubmit]
    submits: [submit]
    submit: [submit]
    info: Student!
    rank: [Student]
    scoreboard: [Scoreboard]
    judges(submitId: Int!): ProblemJudgeResult
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

    exit: Boolean!
  }
`);

module.exports = schema;