const studentRepo = require('../repository/StudentRepository');
const sha256 = require('js-sha256');

const resolvers = {
  login: async ({ studNo, password }, req) => { 
    const result = await studentRepo.getStudentByStudNo(studNo);
    const student = result[0][0];

    if(!student) {
      return { success: false, message: 'Not Found!' };
    } 

    if(student.password !== sha256(password)) {
      return { success: false, message: 'Invalid Credentials' };
    }

    req.session.studId = student.id;
    req.session.studNo = student.studNo;

    return { success: true, message: '로그인 성공' };
  },

  student: async (_, req) => {
    const result = await studentRepo.getStudentByStudNo(req.session.studNo);
    return result[0][0];
  },

  students: async (_, req) => {
    const result = await studentRepo.getStudents();
    return result[0];
  }
};

module.exports = resolvers;