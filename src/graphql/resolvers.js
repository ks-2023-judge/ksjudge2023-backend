const studentRepo = require("../repository/studentRepository");
const noticeRepo = require("../repository/noticeRepository");
const problemRepo = require("../repository/problemRepository");
const submitRepo = require("../repository/submitRepository");
const configRepo = require("../repository/configRepository");
const sha256 = require("js-sha256");
const { default: GraphQLJSON } = require("graphql-type-json");

const resolvers = {
  JSON: GraphQLJSON,

  login: async ({ studNo, password }, req) => {
    const result = await studentRepo.getStudentByStudNo(studNo);
    const student = result[0][0];

    if (!student) {
      return { success: false, message: "Not Found!" };
    }

    if (student.state != 0) return { success: false, message: "로그인 불가" };

    if (student.password !== sha256(password)) {
      return { success: false, message: "Invalid Credentials" };
    }

    req.session.studId = student.id;
    req.session.studNo = student.studNo;

    return { success: true, message: "로그인 성공" };
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
    if (studId == null) throw new Error("Unauthorized");
    const result = await problemRepo.getProblemsByStudId(studId);
    return result[0];
  },

  problemsWithSubmitByStudId: async (args, req) => {
    const result = await problemRepo.getProblemsByStudId(args.studId);
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
    if (studId == null) throw new Error("Unauthorized");
    const result = await problemRepo.getSubmitByStudId(studId);
    return result[0];
  },

  submits: async (_, req) => {
    const result = await problemRepo.getAllSubmits();
    return result[0];
  },

  info: async (_, req) => {
    const { studId, studNo } = req.session;
    if (!studId || !studNo) throw new Error("Unauthorized");
    const result = await studentRepo.getStudentByStudId(studId);
    return result[0][0];
  },

  rank: async (_, req) => {
    const result = await studentRepo.getStudents();
    const students = result[0];
    const rank = students
      .sort((a, b) => (b.k == a.k ? a.score - b.score : b.k - a.k))
      .map((student, i) => ({ ...student, rank: i + 1 }));

    const result2 = await studentRepo.getScoreBoard();
    const tries = result2[0];
    const scoreboard = new Map();

    tries.forEach(({ studNo, problemNo, try_cnt, score }) => {
      if (!scoreboard.has(studNo)) {
        scoreboard.set(studNo, {});
      }
      scoreboard.get(studNo)[problemNo] = { try_cnt, score };
    });
    const s = Array.from(scoreboard.entries()).map(([studNo, tries]) => ({
      studNo,
      tries,
    }));
    s.forEach(({ studNo, tries }) => {
      rank.find((student) => student.studNo == studNo).tries = tries;
    });
    return rank;
  },

  judges: async ({ submitId }) => {
    const result = await problemRepo.getSubmitById(submitId);
    const judge = await problemRepo.listJudgeResult(submitId);

    let reducer = judge[0].reduce((acc, current) => {
      acc[current.t_no] = acc[current.t_no] || [];
      acc[current.t_no].push(current);
      return acc;
    }, Object());

    let kv = Object.entries(reducer).map(([key, value]) => {
      if (value.length == 0 || (value.length == 1 && !value[0].id))
        return { testcase_id: key, judge_detail: null };

      return { testcase_id: key, judge_detail: value };
    });

    return { result: result[0][0], judge: kv };
  },

  exit: async (_, req) => {
    const { studId, studNo } = req.session;
    if (!studId || !studNo) throw new Error("Unauthorized");
    const result = await studentRepo.exit(studId);
    const updated = result[0].changedRows;
    return updated > 0 ? true : false;
  },

  updateStudentState: async (state, req) => {
    const { studId, studNo } = req.session;
    if (!studId || !studNo) throw new Error("Unauthorized");
    const result = await studentRepo.updateStudentState(studId, state);
    if (result == 0) throw new Error("Update Error");
    const updateStudent = await studentRepo.getStudentStateByStudId(studId);
    return updateStudent[0][0];
  },
  insertSubmit: async (submit, req) => {
    const { studId, studNo } = req.session;
    if (!studId || !studNo) throw new Error("Unauthorized");
    const result = await submitRepo.insertSubmit(submit);
    if (result == 0) throw new Error("Insert Error");
    const insertSubmit = await submitRepo.getSubmitById(result[0].insertId);
    return insertSubmit[0].map(val => { return { stud_id: val['studId'], ...val}; })[0];
  },
  updateSubmitScore: async (submit, req) => {
    const { studId, studNo } = req.session;
    if (!studId || !studNo) throw new Error("Unauthorized");
    const result = await submitRepo.updateSubmitScore(studId, score);
    if (result == 0) throw new Error("Update Error");
    const updateSubmitScore = await submitRepo.getSubmitScoreByStudId(studId);
    return updateSubmitScore[0][0];
  },
  config: async (_) => {
    const db_result = await configRepo.getConfigs();
    const result = Object();
    Array.from(db_result[0]).forEach((kv) => {
      result[kv.key] = kv.val;
    })

    if (result['START_AT']) {
      result['START_AT'] = Math.floor((new Date(result['START_AT'])).getTime() / 1000)
    }
    if (result['END_AT']) {
      result['END_AT'] = Math.floor((new Date(result['END_AT'])).getTime() / 1000)
    }

    return result;
  }
};

module.exports = resolvers;
