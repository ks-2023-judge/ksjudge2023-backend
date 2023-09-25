const MybatisMapper = require("mybatis-mapper");

class StudentRepository {
  constructor(pool) {
    this.namespace = 'src.repository.StudentRepository';
    this.pool = pool;
  }

  async getStudentByStudNo(studNo) {
    this.pool.getConnection((err, connection) => {
      if(err) return console.error('Error getting connection from pool: ', err);

      const query = MybatisMapper.getStatement(
        this.namespace,
        'getStudentByStudNo',
        { studNo },
      );

      connection.query(query, (err, results) => {
        if(err) console.error('Error executing query: ', err);
        else console.log('Query results: ', results);

        connection.release();
      })
    });
  }
}

module.exports = StudentRepository;