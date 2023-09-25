const express = require('express');
const mybatis = require('./config/mybatis');

const app = express();
mybatis.init();

const port = process.argv[2] || 8080;

const StudentRepository = require('./repository/StudentRepository');
const studentRepo = new StudentRepository();

app.use('/', (req, res) => {
  studentRepo.getStudentByStudNo('2019575051')
  .then(res => console.log(res));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});