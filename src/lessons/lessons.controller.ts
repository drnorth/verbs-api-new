import { NextFunction, Request, Response } from "express";
import { LessonsService } from "./lessons.service";
import httpStatus from "http-status";
import ApiError from "utils/ApiError";

export class LessonsController {
  static async getAllLessons(req: Request, res: Response, next: NextFunction) {
    const lessons = await new LessonsService().findAllLessons();

    return res.send(lessons);
  }

  static async createLesson(req: Request, res: Response, next: NextFunction) {
    const lesson = await new LessonsService().createLesson(req.body);

    return res.status(httpStatus.OK).json({
      message: "Post has been created successfully",
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
    const result = await new LessonsService().getResultLesson(req.body);

    return res.status(httpStatus.OK).json({
      message: "Post has been created successfully",
      result,
    });
  }

  static async getQuestions(req: Request, res: Response, next: NextFunction) {
    const questions = await new LessonsService().findAllQuestions();

    return res.status(httpStatus.OK).json(questions);
  }

  static async removeQuestion(req: Request, res: Response, next: NextFunction) {
    const response = await new LessonsService().removeQuestion(
      Number(req.params.id)
    );

    if (!response) throw new ApiError(httpStatus.NOT_FOUND, "Not found");

    return res.status(httpStatus.OK).json({
      message: "Question has been deleted",
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
    const response = await new LessonsService().deleteLesson(
      Number(req.params.id)
    );

    if (!response) throw new ApiError(httpStatus.NOT_FOUND, "Not found");

    return res.status(httpStatus.OK).json({
      message: "Lesson has been deleted",
    });
  }
}
