import { getRepository, FindConditions, QueryBuilder } from "typeorm";
import { User } from "./user.entity";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";

export class UserService {
  private userRepository = getRepository(User);

  async all() {
    return this.userRepository.find();
  }

  async createFastUser(deviceId: string, language: string) {
    const countFastUsers = await this.userRepository.count({
      isAutoCreated: true,
    });
    const userObj: any = {
      name: "user_" + (countFastUsers ? countFastUsers + 1 : 1),
      deviceId,
      language: {
        code: language
      },
      isAutoCreated: true,
    };

    return this.userRepository.save(userObj);
  }

  async one(id: string | number | FindConditions<User>) {
    return this.userRepository.findOne(id as any);
  }

  async save(body: User) {
    return this.userRepository.save(body);
  }

  async update(id: string | number, data: object) {
    const userToUpdate = await this.userRepository.findOne(id);
    if (!userToUpdate) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const userObj: any = {
      id: userToUpdate.id,
      ...data,
    };
    return this.userRepository.save(userObj);
  }

  async remove(id: string) {
    const userToRemove = await this.userRepository.findOne(id);
    if (!userToRemove) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    this.userRepository.remove(userToRemove);
  }
}
