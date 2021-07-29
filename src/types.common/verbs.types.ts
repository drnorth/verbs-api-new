import { VerbTranslation } from "verbs/entities/translations.entity";

export interface IVerb {
  id: string;
  inf: string;
  simple: string;
  part: string;
  translations: VerbTranslation[];
  difficult: Difficult;
}

export enum Difficult {
  EASY = "EASY",
  MIDDLE = "MIDDLE",
  HARD = "HARD",
}

export interface ICreateVerb {
  inf: string;
  simple?: string;
  part?: string;
  difficult?: Difficult;
}
