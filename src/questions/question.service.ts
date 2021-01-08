import { getRepository } from "typeorm";
import { Question } from "./question.entity";
import {
  IQuestion,
  ICreateQuestion,
  IUpdateQuestion,
} from "types.common/lessons.types";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";

export class QuestionService {
  private questionRepository = getRepository(Question);

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find();
  }

  async findByOptions(id: string | number) {
    const questions = await this.questionRepository.find({
      where: {
        lesson: id,
      },
    });

    return questions;
  }

  async findById(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne(id);

    if (!question) {
      throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }

    return question;
  }

  async updateQuestion(
    id: string,
    updateQuestion: IUpdateQuestion
  ): Promise<any> {
    const question = await this.questionRepository.update(id, updateQuestion);

    if (!question) {
      throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }

    return question;
  }

  async createQuestion(createQuestion: ICreateQuestion): Promise<IQuestion> {
    const question = await this.questionRepository.save(createQuestion);

    return question;
  }

  async removeQuestion(id: number): Promise<any> {
    return await this.questionRepository.delete(id);
  }
}
