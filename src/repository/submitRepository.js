const MyBatisMapper = require("mybatis-mapper");
const Query = require("../config/database");

class submitRepository {
  constructor() {
    this.namespace = "submitRepository";
  }

  async insertSubmit(studId, type, problemNo, code, score) {
    const sql = MyBatisMapper.getStatement(this.namespace, "insertSubmit", {
      studId,
      type,
      problemNo,
      code,
      score,
    });
    return Query(sql);
  }
  async getSubmitByStudId() {
    const sql = MyBatisMapper.getStatement(this.namespace, "getSubmitByStudId");
    return Query(sql);
  }
  async updateSubmitScore(studId, score) {
    const sql = MyBatisMapper.getStatement(
      this.namespace,
      "updateSubmitScore",
      { studId, score }
    );
    return Query(sql);
  }
  async getSubmitScoreByStudId(studId) {
    const sql = MyBatisMapper.getStatement(
      this.namespace,
      "getSubmitScoreByStudId",
      { studId }
    );
    return Query(sql);
  }
}
const submitRepo = new submitRepository();
module.exports = submitRepo;
