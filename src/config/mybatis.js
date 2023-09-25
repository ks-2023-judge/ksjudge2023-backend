const path = require('path');
const mybatisMapper = require('mybatis-mapper');

mybatisMapper.createMapper([
  path.resolve(__dirname, '../mapper/studentMapper.xml'),
]);

module.exports.init = () => {
  // mybatis init
}