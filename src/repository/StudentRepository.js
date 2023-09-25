const MyBatisMapper = require('mybatis-mapper');
const Query = require('../config/database');

class StudentRepository {
  constructor() {
    this.namespace = "StudentRepository";
  }

  async getStudentByStudNo(studNo) {
    const sql = MyBatisMapper.getStatement(this.namespace, 'getStudentByStudNo', { studNo });
    return Query(sql);
  }

  async getStudents() {
    const sql = MyBatisMapper.getStatement(this.namespace, 'getStudents');
    return Query(sql);
  }
}
const studentRepo = new StudentRepository();
module.exports = studentRepo;
