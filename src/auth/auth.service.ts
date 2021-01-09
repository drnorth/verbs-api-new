import httpStatus from "http-status";
import { User } from "user/user.entity";
import { UserService } from "user/user.service";
import { TokenService } from "token/token.service";
import ApiError from "utils/ApiError";
import { TypesToken } from "token/token.entity";

export class AuthService {
  async login(deviceId: string): Promise<any>;
  async login(name: string, password: string): Promise<any>;
  async login(nameOrDeviceId: string, password?: string): Promise<any> {
    let findOptionUser: { name?: string; deviceId?: string } = {
      deviceId: nameOrDeviceId,
    };

    const userService = new UserService();
    if (password) {
      findOptionUser = { name: nameOrDeviceId };
    }

    let user = await userService.one(findOptionUser);

    if (!user) {
      if (findOptionUser.name) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "user not found");
      }

      user = (await userService.createFastUser(nameOrDeviceId)) as User;
    }

    if (findOptionUser.name && !user.isPasswordMatch(password as string)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "incorrect password");
    }
    const tokens = await new TokenService().generateAuthToken(user);

    return { user, tokens };
  }

  async logout(refreshToken: string) {
    const token = await new TokenService().getToken({
      token: refreshToken,
      type: TypesToken.REFRESH,
      blacklisted: false,
    });

    if (!token) {
      throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }

    await token.remove();
  }

  async refreshAuth(refreshToken: string) {
    const tokenService = new TokenService();
    const token = await tokenService.verifyToken(
      refreshToken,
      TypesToken.REFRESH
    );
    const user = token.user;

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
    }

    await token.remove();

    return tokenService.generateAuthToken(user);
  }

  async resetPassword(resetPasswordToken: string) {
    const tokenService = new TokenService();
    const token = await tokenService.verifyToken(
      resetPasswordToken,
      TypesToken.RESET_PASSWORD
    );

    const user = token.user;

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
    }

    await tokenService.deleteManyTokens({
      user,
      type: TypesToken.RESET_PASSWORD,
    });

    await new UserService().update(user.id, {
      type: TypesToken.RESET_PASSWORD,
    });
  }
}
