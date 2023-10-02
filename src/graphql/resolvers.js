const studentRepo = require('../repository/studentRepository');
const noticeRepo = require('../repository/noticeRepository');
const problemRepo = require('../repository/problemRepository');
const sha256 = require('js-sha256');
const { default: GraphQLJSON } = require('graphql-type-json');

const resolvers = {
  JSON: GraphQLJSON,

  login: async ({ studNo, password }, req) => { 
    const result = await studentRepo.getStudentByStudNo(studNo);
    const student = result[0][0];

    if(!student) {
      return { success: false, message: 'Not Found!' };
    } 

    if(student.state != 0) return { success: false, message: '로그인 불가' };

    if(student.password !== sha256(password)) {
      return { success: false, message: 'Invalid Credentials' };
    }

    req.session.studId = student.id;
    req.session.studNo = student.studNo;

    return { success: true, message: '로그인 성공' };
  },

  student: async (args, req) => {
    const result = await studentRepo.getStudentByStudNo(args.studNo);
    return result[0][0];
  },

  students: async (_, req) => {
    const result = await studentRepo.getStudents();
    return result[0];
  },

  notices: async (_, req) => {
    const result = await noticeRepo.getNotices();
    return result[0];
  },

  problemsWithSubmit: async (_, req) => {
    const studId = req.session.studId;
    if(studId == null) throw new Error('Unauthorized');
    const result = await problemRepo.getProblemsByStudId(studId);
    return result[0];
  },

  problemsWithSubmitByStudId: async (args, req) => {
    const result = await problemRepo.getProblemsByStudId(args.studId);
    console.log(result[0]);
    return result[0];
  },

  problem: async (args, req) => {
    const result = await problemRepo.getProblemByNo(args.no);
    const problem = result[0][0];
    return problem;
  },

  problems: async (_, req) => {
    const result = await problemRepo.getAllProblems();
    return result[0];
  },

  submit: async (_, req) => {
    const studId = req.session.studId;
    if(studId == null) throw new Error('Unauthorized');
    const result = await problemRepo.getSubmitByStudId(studId);
    return result[0];
  },

  submits: async (_, req) => {
    const result = await problemRepo.getAllSubmits();
    return result[0];
  },

  info: async (_, req) => {
    const { studId, studNo } = req.session;
    if(!studId || !studNo) throw new Error('Unauthorized');
    const result = await studentRepo.getStudentByStudId(studId);
    return result[0][0]; 
  },

  rank: async (_, req) => {
    const result = await studentRepo.getStudents();
    const students = result[0];
    const rank = students.sort((a, b) => (b.k == a.k) ? (a.score - b.score) : b.k - a.k).map((student, i) => ({...student, rank: i + 1}));

    const result2 = await studentRepo.getScoreBoard();
    const tries = result2[0];
    const scoreboard = new Map();

    tries.forEach(({ studNo, problemNo, try_cnt, score }) => {
      if(!scoreboard.has(studNo)) {
        scoreboard.set(studNo, {});
      }
      scoreboard.get(studNo)[problemNo] = { try_cnt, score };
    }); 
    const s = Array.from(scoreboard.entries()).map(([ studNo, tries ]) => ({ studNo, tries }));
    s.forEach(({ studNo, tries }) => {
      rank.find(student => student.studNo == studNo).tries = tries;
    });
    return rank;
  },
  
  judges: async ({submitId}) => {
    const result = await problemRepo.getSubmitById(submitId);
    const judge = await problemRepo.listJudgeResult(submitId);

    console.info(judge[0].map(j => { return {result: result[0][0], judge: j}; }));

    return { result: result[0][0], judge: judge[0] };
  },

  exit: async (_, req) => {
    const { studId, studNo } = req.session;
    if(!studId || !studNo) throw new Error('Unauthorized');
    const result = await studentRepo.exit(studId);
    const updated = result[0].changedRows;
    return (updated > 0) ? true : false;
  }
};

module.exports = resolvers;