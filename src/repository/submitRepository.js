const MyBatisMapper = require("mybatis-mapper");
const Query = require("../config/database");

const { getBytes } = require("../common/str");


class submitRepository {
  constructor() {
    this.namespace = "submitRepository";
  }

  async insertSubmit(submit) {
    let params = { ...submit };
    params['code_size'] = getBytes(params['code']);
    params['code'] = params['code'].replace("'", "\\'");

    const sql = MyBatisMapper.getStatement(
      this.namespace,
      "insertSubmit",
      params  
    );

    return Query(sql, [params['code']]);
  }
  async getSubmitByStudId(studId) {
    const sql = MyBatisMapper.getStatement(this.namespace, "getSubmitByStudId", { studId });
    return Query(sql);
  }
  async getSubmitById(id) {
    const sql = MyBatisMapper.getStatement(this.namespace, "getSubmitById", { id });
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
