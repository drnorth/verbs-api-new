import { Language } from "languages/entities/language.entity";
import {
  HeaderTranslation,
  TitleTranslation,
} from "languages/entities/translations.entity";
import { Lesson } from "lessons/entities/lesson.entity";
import { getRepository } from "typeorm";
import { AnswerType, QuestionAction, QuestionType } from "types.common/lessons.types";
import { SimulatorType } from "types.common/simulators.types";
import { Verb } from "verbs/entities/verb.entity";
import { VerbController } from "verbs/verb.controller";
import { VerbsService } from "verbs/verb.service";
import shuffle from "./shuffle";

interface IPickedVerb {
  id: number;
  type: QuestionType;
  answerType: AnswerType;
  verb: Verb;
  action: SimulatorType | QuestionAction;
}

const vowelsLetter = ["a", "e", "i", "o", "u", "y"];
const variatTrick = [
  "ing",
  "ed",
  "en",
  "own",
  "on",
  "ept",
  "et",
  "old",
  "ought",
];

export const generateQuestions = async (
  pickedVerbs: IPickedVerb[],
  language: Language,
  countAnswers?: number,
) => {
  const headerTransRepo = getRepository(HeaderTranslation);
  const titleTransRepo = getRepository(TitleTranslation);
  const headerTrans = await headerTransRepo.find({ language });
  const titleTrans = await titleTransRepo.find({ language });
  //generate title, subTitle

  return pickedVerbs.map((pickVerb) => {
    const { answerType } = pickVerb;
    let title = pickVerb.verb.inf;
    if (answerType === 'inf') {
      title = pickVerb.verb.translations.reduce((acc, translation) => {
        return acc + "," + translation.translation;
      }, "");
    }

    const regAnswer = pickVerb.verb[answerType].match(/.*(?=\/| )|.*(?=\()/);
    const correct = regAnswer ? regAnswer[0] : pickVerb.verb[answerType];
    const findedHeader = headerTrans.find((header) => header.action.valueOf() === pickVerb.action.valueOf());
    let header = '';
    if (findedHeader) {
      header = findedHeader.name;
    }
    return {
      id: pickVerb.id,
      header,
      title,
      subTitle: "",
      correct,
      answers: generateAnswers(pickVerb, countAnswers || 10),
      shuffledLetters: generateAnswersLatter(pickVerb)
    };
  });
};

const generateAnswers = async (verbToGenerate: IPickedVerb, countAnswers: number) => {
  if (verbToGenerate.action === "WRITE" || verbToGenerate.action === "LETTER") {
    return [];
  }

  const { answerType } = verbToGenerate;

  const regAnswer = verbToGenerate.verb[answerType].match(/.*(?=\/| )|.*(?=\()/);
  const correctAnswer = regAnswer ? regAnswer[0] : verbToGenerate.verb[answerType];
  
  const variatTickCurr = variatTrick.filter(
    (currTick) => !correctAnswer.endsWith(currTick)
  );

  const checkingArray = vowelsLetter.concat(variatTrick);

  const changedAnswer = correctAnswer.replace(/[(][A-Z]+[)]/gi, "").trim();
  
  let flag = true;
  const variatString = checkingArray.reduce(
    (acc, currCheck) => {
      if (flag) { 
        return acc.replace(new RegExp(currCheck + "$"), "")
      } 
      flag = false; 
      return acc;
    },
    changedAnswer
  );

  const getValue = () => {
    const randomIndex = Math.floor(Math.random() * variatTickCurr.length);
    const unswerString = variatString + variatTickCurr[randomIndex];
    variatTickCurr.splice(randomIndex, 1);
    return unswerString;
  };

  const list = Array.from({ length: countAnswers - 1 });

  return shuffle([
    {
      id: verbToGenerate.verb.id,
      value: correctAnswer,
    },
    ...list.map((_) => ({
      id: Math.random().toString(16),
      value: getValue(),
      })),
    ]
  );
};

const generateAnswersLatter = (verbToGenerate: IPickedVerb) => {
  if (verbToGenerate.action === "WORD" || verbToGenerate.action === "CHOOSE") {
    return [];
  }

  const { answerType } = verbToGenerate;

  const regAnswer = verbToGenerate.verb[answerType].match(/.*(?=\/| )|.*(?=\()/);
  const correctAnswer = regAnswer ? regAnswer[0] : verbToGenerate.verb[answerType];
 
  return shuffle(correctAnswer.split(""));
}