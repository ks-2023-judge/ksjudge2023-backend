class StudentDTO {
  constructor(id, studNo, password, name, state, k, d, a, team, score, grade) {
    this.id = id;
    this.studNo = studNo;
    this.password = password;
    this.name = name;
    this.state = state;
    this.k = k;
    this.d = d;
    this.a = a;
    this.team = team;
    this.score = score;
    this.grade = grade;
  };
}

module.exports = Student;