const express = require('express');
const app = express();

const port = process.argv[2] || 8080;

const StudentRepository = require('./repository/StudentRepository');
const pool = require('./config/database');
const studentRepository = new StudentRepository(pool);

app.use('/', (req, res) => {
  res.send(studentRepository.getStudentByStudNo("2019575051"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});