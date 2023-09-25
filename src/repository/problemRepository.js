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
}

const problemRepo = new ProblemRepository();
module.exports = problemRepo;