import httpStatus from "http-status";
import { UserService } from "user/user.service";
import ApiError from "utils/ApiError";

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

    const user = await userService.one(findOptionUser);
    if (!user) {
      if (findOptionUser.name) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "user not found");
      }
      const countFastUsers = await userService.count({ isAutoCreated: true });
      const userObj: any = {
        name: "user_" + countFastUsers ? countFastUsers + 1 : "1",
        deviceId: nameOrDeviceId,
        isAutoCreated: true,
      };
      return userService.save(userObj);
    }
    if (findOptionUser.name && !user.isPasswordMatch(password as string)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "incorrect password");
    }
    return user;
  }
}
