import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { getConnection, Connection } from "typeorm";
import { User } from "./user.entity";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";

export class UserService {
  private userRepository = getRepository(User);

  async all() {
    return this.userRepository.find();
  }

  async one(id: string) {
    return this.userRepository.findOne(id);
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
