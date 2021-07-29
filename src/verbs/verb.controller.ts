import { NextFunction, Request, Response } from "express";
import { VerbsService } from "./verb.service";
import httpStatus from "http-status";
import ApiError from "utils/ApiError";
import { User } from "user/user.entity";

export class VerbController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    const user = req.user as User;
    const verbs = await new VerbsService().findAll(user.languageCode);
    return res.send(verbs);
  }

  static async addVerb(req: Request, res: Response, next: NextFunction) {
    const verb = await new VerbsService().create(req.body);

    return res.send(verb);
  }

  static async findVerb(req: Request, res: Response, next: NextFunction) {
    const user = req.user as User;
    const verb = await new VerbsService().findById(req.params.id, user.languageCode);

    return res.send(verb);
  }

  static async updateVerb(req: Request, res: Response, next: NextFunction) {
    const response = await new VerbsService().update(req.params.id, req.body);

    if (!response) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

    return res.status(httpStatus.OK).json({
      message: "Post has been successfully updated",
    });
  }

  static async deleteVerb(req: Request, res: Response, next: NextFunction) {
    const response = await new VerbsService().delete(req.params.id);

    if (!response)
      throw new ApiError(httpStatus.NOT_FOUND, "Verb does not exist");

    return res.status(httpStatus.OK).json({
      message: "Verb has been deleted",
    });
  }
}
