const path = require('path');
const mybatisMapper = require('mybatis-mapper');

mybatisMapper.createMapper([
  path.resolve(__dirname, '../mapper/studentMapper.xml'),
]);


const Query = (namespace, sqlID, params) => {
  return mybatisMapper.getStatement(namespace, sqlID, params, { language: 'sql', indent: '  '});
}

module.exports = Query;