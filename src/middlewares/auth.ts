import passport from "passport";
import httpStatus from "http-status";
import { RequestHandler, Request } from "express";
import { User } from "user/user.entity";
import ApiError from "utils/ApiError";
import { roleRights } from "config/roles";

type func = (param?: unknown) => void;

const verifyCallback = (
  req: Request,
  resolve: func,
  reject: func,
  requiredRights: any[]
) => async (err: any, user: User, info: any) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate"));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every(
      (requiredRight) =>
        userRights.includes(requiredRight) || requiredRight === undefined
    );
    if (!hasRequiredRights && Number(req.params.userId) !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
    }
  }

  resolve();
};

export const auth = (...requiredRights: any[]) =>
  <RequestHandler>async function (req, res, next) {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };
