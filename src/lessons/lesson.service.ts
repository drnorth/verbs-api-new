import { getRepository, Between } from "typeorm";
import { Lesson } from "lessons/entities/lesson.entity";
import {
  ILesson,
  ICreateLesson,
  IGetResulLesson,
  IQuestion,
  QuestionAction,
  QuestionType,
  AnswerType,
  StatusLesson,
} from "types.common/lessons.types";
import { Difficult, IVerb } from "types.common/verbs.types";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import { generateLessons, generateQuestions } from "./utils";
import { QuestionService } from "questions/question.service";
import { Verb } from "verbs/verb.entity";
import { OpenedLesson } from "./entities/openedLesson.entity";
import { User } from "user/user.entity";
import { ILessonStatistic, IVerbStatistic } from "types.common/statistic.types";
import { StatisticService } from "statistic/statistic.service";

export class LessonsService {
  private lessonRepository = getRepository(Lesson);
  private verbRepository = getRepository(Verb);
  private questionService = new QuestionService();
  private openedLessonRepository = getRepository(OpenedLesson);

  async findAllLessons(userId: string): Promise<Lesson[]> {
    return await this.lessonRepository
      .createQueryBuilder("lesson")
      .leftJoin(
        OpenedLesson,
        "openLesson",
        "lesson.id = openLesson.lessonId AND openLesson.userId = :user",
        { user: Number(userId) }
      )
      .addSelect(
        "CASE WHEN openLesson.id IS NULL THEN 'LOCK' ELSE openLesson.status END",
        "lesson_status"
      )
      .addSelect(
        "CASE WHEN openLesson.id IS NULL THEN 0 ELSE openLesson.bestAttempt END",
        "lesson_bestAttempt"
      )
      .getMany();
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
    const lesson = await this.lessonRepository.findOne(id, {
      relations: ["questions"],
    });
    const verbs = await this.verbRepository.find();

    if (!lesson) {
      throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }

    return {
      ...lesson,
      questions: generateQuestions(lesson, verbs, lesson.questions),
    };
  }

  async updateLesson(id: number, createLesson: ICreateLesson): Promise<any> {
    return await this.lessonRepository.update(id, createLesson);
  }

  async deleteLesson(id: number): Promise<any> {
    const lesson = await this.lessonRepository.findOne(id);

    if (!lesson) {
      throw new ApiError(httpStatus.NOT_FOUND, "Not found");
    }
    return await this.lessonRepository.remove(lesson);
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
  async openLessons(
    user: User | undefined,
    difficult: Difficult
  ): Promise<any> {
    if (!user) {
      return;
    }
    const countQuestionForOpen = 5;
    const openedLessons = await this.openedLessonRepository
      .createQueryBuilder("openLessons")
      .leftJoin(Lesson, "lesson", "lesson.id = openLessons.lessonId")
      .where("lesson.difficult = :difficult AND openLessons.userId = :userId", {
        difficult,
        userId: user.id,
      })
      .getMany();
    this.openedLessonRepository.find();
    const countComplete = openedLessons.reduce((acc, curr) => {
      return acc + (curr.status === StatusLesson.COMPLETE ? 1 : 0);
    }, 0);
    if (!openedLessons.length || countComplete / openedLessons.length > 0.6) {
      const lessonsForOpen = await this.lessonRepository
        .createQueryBuilder("lesson")
        .where(
          `(lesson.order BETWEEN ${openedLessons.length} AND ${
            openedLessons.length + countQuestionForOpen - 1
          }) AND lesson.difficult = :difficult`,
          { difficult }
        )
        .getMany();
      const openedLessonForSave = lessonsForOpen.map((value) => {
        return { lesson: value, user: user };
      });
      return await this.openedLessonRepository.save(openedLessonForSave);
    }
  }

  async getResultLesson(
    getResulLessonDto: IGetResulLesson,
    user: User
  ): Promise<any> {
    const { action, lessonId, answers } = getResulLessonDto;
    const verbs: Verb[] = await this.verbRepository.find();
    const questions: IQuestion[] = await this.questionService.findByOptions(
      lessonId
    );

    let verbStatistic: IVerbStatistic[] = [];
    const correct = questions.reduce((acc, curr) => {
      const foundVerb = verbs.find((e) => e.inf === curr.verb) as Verb;
      const foundAnswer = answers.find((e) => e.questionId === curr.id);
      let shouldIncrement: boolean;

      if (foundVerb && foundAnswer && action === QuestionAction.CHOOSE) {
        shouldIncrement = foundVerb.id === foundAnswer.id;
      }

      shouldIncrement =
        !!foundVerb &&
        !!foundAnswer &&
        foundVerb[curr.answerType] === foundAnswer.value;

      verbStatistic.push({
        user,
        verb: foundVerb,
        correct: shouldIncrement,
      });

      return acc + Number(shouldIncrement);
    }, 0 as number);

    const percentCorrect = Math.floor((correct / questions.length) * 100);

    const lesson = (await this.lessonRepository.findOne({
      id: lessonId,
    })) as Lesson;

    if (lesson) {
      const openedLesson = await this.openedLessonRepository.findOne({
        user,
        lesson,
      });

      if (openedLesson && percentCorrect > openedLesson.bestAttempt) {
        openedLesson.bestAttempt = percentCorrect;
        openedLesson.status =
          percentCorrect >= 85 ? StatusLesson.COMPLETE : openedLesson.status;

        await this.openedLessonRepository.save(openedLesson);
        await this.openLessons(user, lesson.difficult);
      }
    }

    const lessonStatistic: ILessonStatistic = {
      lesson,
      user,
      result: percentCorrect,
    };

    await new StatisticService().save(lessonStatistic, verbStatistic);

    return {
      correct,
      total: questions.length,
      result: percentCorrect,
      isComplete: percentCorrect >= 85,
    };
  }

  async initialLessons(): Promise<any> {
    const lessons: ILesson[] = await this.findAllLessons("0");
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

          if (i >= 6 && i <= 12) {
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
