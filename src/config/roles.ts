import { Roles } from "types.common/roles.types";

export const roleRights = new Map();

roleRights.set(Roles.USER, [
  "getQuestions",
  "getLessons",
  "getVerbs",
  "getTest",
  "statistic",
  "userInfo",
]);

roleRights.set(Roles.ADMIN, [
  "getUsers",
  "manageUsers",
  "manageQuestions",
  "manageLessons",
  "manageVerbs",
  "initBase",
  "statisticAdmin",
  "docs",
  "data",
  ...roleRights.get(Roles.USER),
]);
