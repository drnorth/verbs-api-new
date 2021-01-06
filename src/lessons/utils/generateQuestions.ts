import {
  AnswerType,
  ILesson,
  IQuestion,
  QuestionAction,
} from "../interfaces/common.types";
import shuffle from "utils/shuffle";
import { IVerb } from "types.common/verbs.types";

const COUNT = 3;

export const generateQuestions = (
  lesson: ILesson,
  verbs: IVerb[],
  questions: IQuestion[]
) => {
  const { action, difficult } = lesson;

  const filterVerbs = (curr: IQuestion) => {
    const { answerType } = curr;

    const filtredVerbs: IVerb[] = verbs.filter(
      (verb) => verb.inf !== curr.verb && verb.difficult === difficult
    );

    return filtredVerbs.map((verb) => ({
      id: verb.id,
      value: verb[answerType],
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
