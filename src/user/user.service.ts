import { getRepository, FindConditions } from "typeorm";
import { User } from "./user.entity";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";

export class UserService {
  private userRepository = getRepository(User);

  async all() {
    return this.userRepository.find();
  }

  async count(options: FindConditions<User>) {
    return this.userRepository.count(options);
  }

  async one(id: string | FindConditions<User>) {
    return this.userRepository.findOne(id as any);
  }

  async save(body: User) {
    return this.userRepository.save(body);
  }

  async remove(id: string) {
    const userToRemove = await this.userRepository.findOne(id);
    if (!userToRemove) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    this.userRepository.remove(userToRemove);
  }
}
