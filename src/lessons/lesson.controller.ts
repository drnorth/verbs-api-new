import { NextFunction, Request, Response } from "express";
import { LessonsService } from "./lesson.service";
import httpStatus from "http-status";
import ApiError from "utils/ApiError";
import { User } from "user/user.entity";

export class LessonsController {
  static async getAllLessons(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    const lessons = await new LessonsService().findAllLessons(
      (req.user as any).id
    );

    return res.send(lessons);
  }

  static async createLesson(req: Request, res: Response, next: NextFunction) {
    const lesson = await new LessonsService().createLesson(req.body);

    return res.status(httpStatus.OK).json({
      message: "Post has been created successfully",
      lesson,
    });
  }

  static async updateLesson(req: Request, res: Response) {
    const lesson = await new LessonsService().updateLesson(
      Number(req.params.id),
      req.body
    );

    return res.status(httpStatus.OK).json({
      message: "Lesson has been updated successfully",
      lesson,
    });
  }

  static async initialLeassons(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const lessons = await new LessonsService().initialLessons();

    return res.status(httpStatus.OK).json(lessons);
  }

  static async setResult(req: Request, res: Response, next: NextFunction) {
    const payload = {
      lessonId: req.params.id,
      ...req.body,
    };
    const result = await new LessonsService().getResultLesson(
      payload,
      req.user as User
    );

    return res.status(httpStatus.OK).json({
      message: "Post has been created successfully",
      result,
    });
  }

  static async getLesson(req: Request, res: Response, next: NextFunction) {
    const lesson = await new LessonsService().findByIdLesson(
      Number(req.params.id)
    );

    if (!lesson) throw new ApiError(httpStatus.NOT_FOUND, "Not found");

    return res.status(httpStatus.OK).json(lesson);
  }

  static async removeLesson(req: Request, res: Response, next: NextFunction) {
    await new LessonsService().deleteLesson(Number(req.params.id));

    return res.status(httpStatus.NO_CONTENT).send(true);
  }
}
