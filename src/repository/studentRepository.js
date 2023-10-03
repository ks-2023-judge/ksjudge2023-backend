const MyBatisMapper = require("mybatis-mapper");
const Query = require("../config/database");

class StudentRepository {
  constructor() {
    this.namespace = "StudentRepository";
  }

  async getStudentByStudNo(studNo) {
    const sql = MyBatisMapper.getStatement(
      this.namespace,
      "getStudentByStudNo",
      { studNo }
    );
    return Query(sql);
  }

  async getStudents() {
    const sql = MyBatisMapper.getStatement(this.namespace, "getStudents");
    return Query(sql);
  }

  async getStudentByStudId(studId) {
    const sql = MyBatisMapper.getStatement(
      this.namespace,
      "getStudentByStudId",
      { studId }
    );
    return Query(sql);
  }

  async getScoreBoard() {
    const sql = MyBatisMapper.getStatement(this.namespace, "getScoreBoard");
    return Query(sql);
  }

  async exit(studId) {
    const sql = MyBatisMapper.getStatement(this.namespace, "exit", { studId });
    return Query(sql);
  }

  async updateStudentState(studId, state) {
    const sql = MyBatisMapper.getStatement(
      this.namespace,
      "updateStudentState",
      { studId, state }
    );
    return Query(sql);
  }
  async getStudentStateByStudId(studId) {
    const sql = MyBatisMapper.getStatement(
      this.namespace,
      "getStudentStateByStudId",
      {
        studId,
      }
    );
    return Query(sql);
  }
}
const studentRepo = new StudentRepository();
module.exports = studentRepo;
