import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { Lesson } from "lessons/entities/lesson.entity";
import {
  AnswerType,
  QuestionAction,
  QuestionType,
} from "types.common/lessons.types";
import { Difficult } from "types.common/verbs.types";
import { Verb } from "verbs/entities/verb.entity";
import { generateLessons } from "utils/generateLessons";
import { Question } from "questions/question.entity";
import verbsData from "../data/verbs";
import translationsRu from "../data/translationsRu";
import { VerbTranslation } from "verbs/entities/translations.entity";

interface ILesson {
  action: QuestionAction;
  difficult: Difficult;
  order: number;
}

export default class CreateLessons implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const generatedLessons = generateLessons();
    const COUNT_TASKS = 3 * 2 * 3; // AnswerType(3) + action(write | choose) + QuestionType(3)
    const lessons: ILesson[] = [];
    const questions = [];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Verb)
      .values(verbsData)
      .execute();

    const verbs = await connection
      .getRepository(Verb)
      .createQueryBuilder("verb")
      .getMany();

    const valuesForTranslationRu = verbs.map((verb) => ({
      verb,
      language: {
        code: "ru-RU",
        title: "Russian",
      },
      translation: translationsRu[verb.inf],
    }));

    const createLesson = (createLesson: Omit<ILesson, "order">) => {
      const currenLessons: ILesson[] = lessons.filter(
        (e) => e.difficult === createLesson.difficult
      );

      const params = {
        ...createLesson,
        order: 0,
      };

      if (currenLessons && currenLessons.length > 0) {
        params.order = currenLessons[currenLessons.length - 1].order + 1;
      }

      lessons.push(params);

      return params;
    };

    const generateLessonsAndQuestion = async (
      difficult: Difficult,
      items: Record<string, string[]>
    ) => {
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

          const lesson = createLesson({ action, difficult });

          const filtredVerbs = verbs.filter((e) => items[key].includes(e.inf));

          filtredVerbs.forEach((verb) => {
            questions.push({ answerType, lesson, type, verb });
          });
        }
      }
    };

    for (const [index, item] of generatedLessons.entries()) {
      const difficult = Object.values(Difficult);
      const level: Difficult = difficult[index];

      generateLessonsAndQuestion(level, item);
    }

    await connection
      .createQueryBuilder()
      .insert()
      .into(VerbTranslation)
      .values(valuesForTranslationRu)
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Lesson)
      .values(lessons)
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Question)
      .values(questions)
      .execute();
  }
}
