const MyBatisMapper = require('mybatis-mapper');
const Query = require('../config/database');

class ProblemRepository {
  constructor() {
    this.namespace = 'ProblemRepository';
  }

  async getProblemsByStudId(studId) {
    const sql = MyBatisMapper.getStatement(this.namespace, 'getProblemsByStudId', { studId });
    return Query(sql);
  }

  async getSubmitByStudId(studId) {
    const sql = MyBatisMapper.getStatement(this.namespace, 'getSubmitByStudId', { studId });
    return Query(sql);
  }
  
  async getSubmitById(submitId) {
    const sql = MyBatisMapper.getStatement(this.namespace, 'getSubmitById', { submitId });
    return Query(sql);
  }

  async getProblemByNo(problemNo) {
    const sql = MyBatisMapper.getStatement(this.namespace, 'getProblemByNo', { problemNo });
    return Query(sql);
  }

  async getAllSubmits() {
    const sql = MyBatisMapper.getStatement(this.namespace, 'getAllSubmits');
    return Query(sql);
  }

  async getAllProblems() {
    const sql = MyBatisMapper.getStatement(this.namespace, 'getAllProblems');
    return Query(sql);
  }

  async listJudgeResult(submitId) {
    const sql = MyBatisMapper.getStatement(this.namespace, 'listJudgeResult', { submitId });
    return Query(sql);
  }
}

const problemRepo = new ProblemRepository();
module.exports = problemRepo;