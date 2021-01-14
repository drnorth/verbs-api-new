import { Lesson } from "lessons/entities/lesson.entity";
import { User } from "user/user.entity";
import { Verb } from "verbs/verb.entity";

export interface ILessonStatistic {
  lesson: Lesson;
  user: User;
  result: number;
}

export interface IVerbStatistic {
  verb: Verb;
  user: User;
  correct?: boolean;
}
