import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import httpStatus from "http-status";
import ApiError from "utils/ApiError";

export class UserController {
  static async all(req: Request, res: Response, next: NextFunction) {
    const users = await new UserService().all();
    return res.send(users);
  }

  static async one(req: Request, res: Response, next: NextFunction) {
    const user = await new UserService().one(req.params.id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return res.send(user);
  }

  static async save(req: Request, res: Response, next: NextFunction) {
    const user = await new UserService().save(req.body);
    return res.send(user);
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    await new UserService().remove(req.params.id);
    return res.status(httpStatus.NO_CONTENT).send(true);
  }
}
