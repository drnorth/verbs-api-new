import { Roles, userRights, adminRights } from "types.common/roles.types";

export const roleRights = new Map();

roleRights.set(Roles.USER, Object.values(userRights));
roleRights.set(Roles.ADMIN, [
  ...Object.values(userRights),
  ...Object.values(adminRights),
]);
