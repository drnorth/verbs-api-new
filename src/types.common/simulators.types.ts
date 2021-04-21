export interface IResult {
  id: string;
  correct: boolean;
}

export enum SimulatorType {
  WORD = "WORD",
  TEST = "TEST",
  WRITE = "WRITE",
  LETTER = "LETTER",
}
