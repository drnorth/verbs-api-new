export enum Roles {
  USER = "user",
  ADMIN = "admin",
}

export enum userRights {
  getQuestions = "getQuestions",
  getLessons = "getLessons",
  getVerbs = "getVerbs",
  getTest = "getTest",
  statistic = "statistic",
  userInfo = "userInfo",
  simulators = "simulators",
  getLanguages = "getLanguages",
}

export enum adminRights {
  getUsers = "getUsers",
  manageUsers = "manageUsers",
  manageQuestions = "manageQuestions",
  manageLessons = "manageLessons",
  manageVerbs = "manageVerbs",
  initBase = "initBase",
  statisticAdmin = "statisticAdmin",
  docs = "docs",
  data = "data",
}

export type TRights = keyof typeof userRights | keyof typeof adminRights;
