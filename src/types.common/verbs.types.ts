export interface IVerb {
  id: string;
  inf: string;
  simple: string;
  part: string;
  translations: string;
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
