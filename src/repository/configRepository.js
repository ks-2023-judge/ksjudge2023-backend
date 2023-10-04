const MyBatisMapper = require('mybatis-mapper');
const Query = require('../config/database');

class ConfigRepository {
  constructor() {
    this.namespace = 'ConfigRepository';
  }

  getConfigs() {
    const sql = MyBatisMapper.getStatement(this.namespace, 'getConfigs');
    return Query(sql);
  }
}
const configRepo = new ConfigRepository();
module.exports = configRepo;
