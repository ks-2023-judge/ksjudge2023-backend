const path = require('path');
const mybatisMapper = require('mybatis-mapper');

mybatisMapper.createMapper([
  path.resolve(__dirname, '../mapper/studentMapper.xml'),
  path.resolve(__dirname, '../mapper/noticeMapper.xml'),
  path.resolve(__dirname, '../mapper/problemMapper.xml'),
]);

module.exports.init = () => {
  // mybatis init
}