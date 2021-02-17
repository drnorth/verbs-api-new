import {
  AnswerType,
  ILesson,
  IQuestion,
  QuestionAction,
} from "types.common/lessons.types";
import shuffle from "utils/shuffle";
import { IVerb } from "types.common/verbs.types";

const COUNT = 3;
const vowelsLetter = ["a", "e", "i", "o", "u", "y"];
const variatTrick = ["ing", "ed", "en", "own", "n", "et", "old", "ought"];

export const generateQuestions = (
  lesson: ILesson,
  verbs: IVerb[],
  questions: IQuestion[]
) => {
  const { action } = lesson;

  const filterVerbs = (curr: IQuestion) => {
    const { answerType } = curr;
    const findedVerb = verbs.find((verb) => verb.inf === curr.verb) as IVerb;
    const lastElement = curr.verb[curr.verb.length];
    const getValue = () => {
      if (vowelsLetter.includes(lastElement)) {
        return (
          findedVerb[answerType].slice(0, -1) +
          variatTrick[getRandomInt(0, variatTrick.length)]
        );
      }

      return findedVerb[answerType] + variatTrick[getRandomInt(0, variatTrick.length)];
    };

    const list = Array.from({ length: COUNT });
    const getRandomInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return list.map((_) => ({
      id: Math.random().toString(16),
      value: getValue(),
      questionId: curr.id,
    }));
  };

  return questions.map((question: IQuestion) => {
    const foundVerb: IVerb | undefined = verbs.find(
      (verb) => verb.inf === question.verb
    );

    if (action === QuestionAction.CHOOSE && foundVerb) {
      const variantVerbs = shuffle(filterVerbs(question)).slice(0, COUNT);

      return {
        ...question,
        answers: shuffle([
          {
            id: foundVerb.id,
            value: foundVerb[question.answerType],
            questionId: question.id,
          },
          ...variantVerbs,
        ]),
      };
    }

    return {
      ...question,
      answers: {
        questionId: question.id,
        value: "",
      },
    };
  });
};
