const express = require('express');
const mybatis = require('./config/mybatis');
const session = require('express-session');
const { graphqlHTTP } = require('express-graphql'); 
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
mybatis.init();

const port = process.argv[2] || 8080;

app.use(cors({
  origin: ["http://localhost:4000"],
  credentials: true,
}));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  store: new session.MemoryStore(),
  cookie: {
    sameSite: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: null,
    httpOnly: true,
  },
}));

app.use(bodyParser.json());

app.use('/graphql', (req, res, next) => {
  // GraphQL 요청에 query 필드가 없는 경우, 요청 그대로 전달
  if (!req.body || !req.body.query) {
    return next();
  }

  // GraphQL 쿼리가 login query가 아닌 경우
  if (!req.body.query.includes('login')) {
    // req.session에서 stud_id와 학번 확인
    const studId = req.session.studId;
    const studNo = req.session.studNo;

    // stud_id와 학번이 없는 경우 권한이 없다는 응답 반환
    if (!studId || !studNo) {
      return res.status(403).json({ message: '권한이 없습니다.' });
    }
  }

  // 권한이 있는 경우 다음 미들웨어로 이동
  next();
});

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});