const MyBatisMapper = require('mybatis-mapper');
const Query = require('../config/database');

class NoticeRepository {
  constructor() {
    this.namespace = "NoticeRepository";
  }

  getNotices() {
    const sql = MyBatisMapper.getStatement(this.namespace, 'getNotices');
    return Query(sql);
  }
}
const noticeRepo = new NoticeRepository();
module.exports = noticeRepo;
