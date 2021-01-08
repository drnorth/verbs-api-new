import { getRepository } from "typeorm";
import { Lesson } from "./lesson.entity";
import {
  ILesson,
  ICreateLesson,
  IGetResulLesson,
  IQuestion,
  QuestionAction,
  QuestionType,
  AnswerType,
} from "types.common/lessons.types";
import { Difficult, IVerb } from "types.common/verbs.types";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import { generateLessons, generateQuestions } from "./utils";
import { QuestionService } from "questions/question.service";
import { Verb } from "verbs/verb.entity";

export class LessonsService {
  private lessonRepository = getRepository(Lesson);
  private verbRepository = getRepository(Verb);
  private questionService = new QuestionService();

  async findAllLessons(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async findAllLessonsByOptions(level: string): Promise<Lesson[]> {
    return await this.lessonRepository.find({
      order: {
        order: "ASC",
      },
      where: {
        difficult: level,
      },
    });
  }

  async findByIdLesson(id: number): Promise<any> {
    const lesson = await this.lessonRepository.findOne(id);
    const verbs = await this.verbRepository.find();
    const questions = await this.questionService.findByOptions(id);

    if (!lesson) {
      throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }

    return {
      ...lesson,
      questions: generateQuestions(lesson, verbs, questions),
    };
  }

  async updateLesson(id: number, createLesson: ICreateLesson): Promise<any> {
    return await this.lessonRepository.update(id, createLesson);
  }

  async deleteLesson(id: number): Promise<any> {
    return await this.lessonRepository.delete(id);
  }

  async createLesson(createLesson: ICreateLesson): Promise<any> {
    const lessons = await this.findAllLessonsByOptions(createLesson.difficult);

    const params = {
      ...createLesson,
      order: 0,
    };

    if (lessons && lessons.length > 0) {
      params.order = lessons[lessons.length - 1].order + 1;
    }

    const lesson = await this.lessonRepository.save(params);

    return lesson;
  }

  async getResultLesson(getResulLessonDto: IGetResulLesson): Promise<any> {
    const { action, lessonId, answers } = getResulLessonDto;
    const verbs: IVerb[] = await this.verbRepository.find();
    const questions: IQuestion[] = await await this.questionService.findByOptions(
      lessonId
    );

    const correct = questions.reduce((acc, curr) => {
      const foundVerb: IVerb | undefined = verbs.find(
        (e) => e.inf === curr.verb
      );
      const foundAnswer = answers.find((e) => e.questionId === curr.id);
      let shouldIncrement: boolean;

      if (foundVerb && foundAnswer && action === QuestionAction.CHOOSE) {
        shouldIncrement = foundVerb.id === foundAnswer.id;
      }

      shouldIncrement =
        !!foundVerb &&
        !!foundAnswer &&
        foundVerb[curr.answerType] === foundAnswer.value;

      return acc + Number(shouldIncrement);
    }, 0 as number);

    const percentCorrect = Math.floor((correct / questions.length) * 100);

    return {
      correct,
      total: questions.length,
      result: percentCorrect,
      isComplete: percentCorrect >= 85,
    };
  }

  async initialLessons(): Promise<any> {
    const lessons: ILesson[] = await this.findAllLessons();
    const data = generateLessons();

    const generateQuestion = async (verbs: any, param: any) => {
      for (const verb of verbs) {
        await this.questionService.createQuestion({ ...param, verb });
      }
    };

    const createLessons = async (level: Difficult, items: any) => {
      const COUNT_TASKS = 3 * 2 * 3;

      for (const key of Object.keys(items)) {
        for (const [i] of Array.from({ length: COUNT_TASKS }).entries()) {
          const action =
            (i + 1) % 2 === 0 ? QuestionAction.WRITE : QuestionAction.CHOOSE;
          let answerType = "";
          let type = QuestionType.LISTEN;

          if ([0, 1, 6, 7, 12, 13].includes(i)) {
            type = QuestionType.FORM;
          }

          if ([2, 3, 8, 9, 14, 15].includes(i)) {
            type = QuestionType.THREE_FORM;
          }

          if (i < 6) {
            answerType = AnswerType.INF;
          }

          if (i > 6 && i < 12) {
            answerType = AnswerType.SIMPLE;
          }

          if (i > 12) {
            answerType = AnswerType.PART;
          }

          const lesson = await this.createLesson({ action, difficult: level });

          await generateQuestion(items[key], {
            lesson,
            type,
            answerType,
          });
        }
      }
    };

    if (lessons.length) {
      await this.lessonRepository.delete(lessons.map((e) => e.id));
    }

    for (const [index, item] of data.entries()) {
      const level: Difficult =
        index === 0
          ? Difficult.EASY
          : index === 1
          ? Difficult.MIDDLE
          : Difficult.HARD;

      await createLessons(level, item);
    }
  }
}
