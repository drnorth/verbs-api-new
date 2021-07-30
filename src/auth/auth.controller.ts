import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { UserService } from "user/user.service";
import { TokenService } from "token/token.service";
import httpStatus from "http-status";
import generateSecureData from "utils/generateSecureData";
import config from "config/config";
import ApiError from "utils/ApiError";

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    const user = await new UserService().save(req.body);
    const token = await new TokenService().generateAuthToken(user);

    return res.status(httpStatus.CREATED).send({ user, token });
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { fastLogin } = req.body;
    if (fastLogin) {
      const dateForHash = new Date();
      const hashString = `${dateForHash.getUTCDate()}_${dateForHash.getUTCFullYear()}_${dateForHash.getUTCMonth()}_${
        req.body.deviceId
      }`;

      // if (
      //   req.body.hashKey !==
      //   generateSecureData(hashString, config.appConfig.loginSalt)
      // ) {
      //   throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect hash key");
      // }
      return res.send(
        await new AuthService().login(
          req.body.lang || "ru-RU",
          req.body.deviceId
        )
      );
    }
    return res.send(
      await new AuthService().login(req.body.name, req.body.password)
    );
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    await new AuthService().logout(req.body.refreshToken);
    return res.status(httpStatus.NO_CONTENT).send(true);
  }

  static async refreshTokens(req: Request, res: Response, next: NextFunction) {
    const tokens = await new AuthService().refreshAuth(req.body.refreshToken);
    return res.send({ ...tokens });
  }
}
