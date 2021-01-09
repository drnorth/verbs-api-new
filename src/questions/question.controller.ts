import { NextFunction, Request, Response } from "express";
import { QuestionService } from "./question.service";
import httpStatus from "http-status";
import ApiError from "utils/ApiError";

export class QuestionController {
  static async getQuestions(req: Request, res: Response, next: NextFunction) {
    const questions = await new QuestionService().findAll();

    return res.status(httpStatus.OK).json(questions);
  }

  static async getQuestion(req: Request, res: Response, next: NextFunction) {
    const question = await new QuestionService().findById(
      Number(req.params.id)
    );

    if (!question) throw new ApiError(httpStatus.NOT_FOUND, "Not found");

    return res.status(httpStatus.OK).json(question);
  }

  static async createQuestion(req: Request, res: Response, next: NextFunction) {
    const question = await new QuestionService().createQuestion(req.body);

    return res.status(httpStatus.OK).json(question);
  }

  static async removeQuestion(req: Request, res: Response, next: NextFunction) {
    const response = await new QuestionService().removeQuestion(
      Number(req.params.id)
    );

    if (!response) throw new ApiError(httpStatus.NOT_FOUND, "Not found");

    return res.status(httpStatus.OK).json({
      message: "Question has been deleted",
    });
  }

  static async updateQuestion(req: Request, res: Response, next: NextFunction) {
    const response = await new QuestionService().updateQuestion(
      req.params.id,
      req.body
    );

    if (!response) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

    return res.status(httpStatus.OK).json({
      message: "Post has been successfully updated",
    });
  }
}
