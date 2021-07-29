export interface IResult {
  id: string;
  correct: boolean;
}

export enum SimulatorType {
  WORD = "WORD",
  CHOOSE = "CHOOSE",
  WRITE = "WRITE",
  LETTER = "LETTER",
}
