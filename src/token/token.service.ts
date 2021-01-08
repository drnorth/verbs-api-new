import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import dayjs, { Dayjs } from "dayjs";
import httpStatus from "http-status";
import config from "config/config";
import ApiError from "utils/ApiError";
import { Token, TypesToken } from "./token.entity";
import { User } from "user/user.entity";
import { UserService } from "user/user.service";

export class TokenService {
  private tokenRepository = getRepository(Token);

  async generateToken(
    userId: number,
    expires: Dayjs,
    secret = config.jwtConfig.secret
  ) {
    const payload = {
      sub: userId,
      iat: dayjs().unix(),
      exp: expires.unix(),
    };
    return jwt.sign(payload, secret);
  }

  async saveToken(
    token: string,
    userId: number,
    expires: Dayjs,
    type: keyof typeof TypesToken,
    blacklisted = false
  ) {
    const tokenObj: any = {
      token,
      type,
      user: userId,
      expires: expires.toDate(),
      blacklisted,
    };
    return this.tokenRepository.save(tokenObj);
  }

  async verifyToken(token: string, type: TypesToken) {
    const payload: any = jwt.verify(token, config.jwtConfig.secret);
    const tokenDoc = await this.tokenRepository.findOne({
      token,
      type,
      user: payload.sub,
      blacklisted: false,
    });
    if (!tokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, "Token not found");
    }
    return tokenDoc;
  }

  async generateAuthToken(user: User) {
    const accessTokenExpires = dayjs().add(
      Number(config.jwtConfig.accessExpirationMinutes),
      "m"
    );
    const accessToken = await this.generateToken(user.id, accessTokenExpires);

    const refreshTokenExpires = dayjs().add(
      Number(config.jwtConfig.refreshExpirationDays),
      "d"
    );

    const refreshToken = await this.generateToken(user.id, refreshTokenExpires);

    await this.saveToken(refreshToken, user.id, refreshTokenExpires, "REFRESH");
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }

  async generateResetPasswordToken(id: string) {
    const user = await new UserService().one(id);
    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "No users found with this email"
      );
    }
    const expires = dayjs().add(
      config.jwtConfig.resetPasswordExpirationMinutes,
      "m"
    );
    const resetPasswordToken = await this.generateToken(user.id, expires);
    await this.saveToken(
      resetPasswordToken,
      user.id,
      expires,
      "RESET_PASSWORD"
    );
    return resetPasswordToken;
  }
}
