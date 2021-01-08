import { Difficult, IVerb } from "types.common/verbs.types";

export enum QuestionAction {
  CHOOSE = "CHOOSE",
  WRITE = "WRITE",
}

export enum QuestionType {
  FORM = "FORM",
  THREE_FORM = "THREE_FORM",
  LISTEN = "LISTEN",
}

export enum AnswerType {
  INF = "inf",
  SIMPLE = "simple",
  PART = "part",
}

export interface ILesson {
  id: number;
  action: QuestionAction;
  difficult: Difficult;
  order: number;
}

export interface IQuestion {
  id: number;
  lessonId?: number;
  type: QuestionType;
  answerType: AnswerType;
  verb: string;
}

export interface IAnswerResult {
  value: string;
  id?: string | number;
  questionId: number;
}

export interface ICreateLesson {
  action: QuestionAction;

  difficult: Difficult;
}

export interface IGetResulLesson {
  lessonId: number;
  action: QuestionAction;
  answers: IAnswerResult[];
}

export interface ICreateQuestion {
  lessondId: number;
  title: string;
  type: QuestionType;
  answerType: AnswerType;
  verb: string;
}

export interface IUpdateQuestion {
  title?: string;
  type?: QuestionType;
  answerType?: AnswerType;
  verb?: string;
}
