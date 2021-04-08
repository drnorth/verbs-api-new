import { SimulatorsStatisticService } from "simulators/simulatorsStatistic.service";
import { AnswerType, QuestionType } from "types.common/lessons.types";
import { IResult } from "types.common/simulators.types";
import { User } from "user/user.entity";
import shuffle from "utils/shuffle";
import { Verb } from "verbs/verb.entity";

export class FindWordService {
  async generateAnswers(pickedVerbs: Verb[]) {
    const COUNT = 3;
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

    const answerValues = Object.values(AnswerType);

    return pickedVerbs.reduce((acc, curr) => {
      const currentAnswerType =
        answerValues[Math.floor(Math.random() * answerValues.length)];

      const variatTickCurr = variatTrick.filter(
        (currTick) => !curr[currentAnswerType].endsWith(currTick)
      );

      const checkingArray = vowelsLetter.concat(variatTrick);

      const changedAnswer = curr[currentAnswerType]
        .replace(/[(][A-Z]+[)]/gi, "")
        .trim();

      const variatString = checkingArray.reduce(
        (acc, currCheck) => acc.replace(new RegExp(currCheck + "$"), ""),
        changedAnswer
      );

      const getValue = () => {
        const randomIndex = Math.floor(Math.random() * variatTickCurr.length);
        const unswerString = variatString + variatTickCurr[randomIndex];
        variatTickCurr.splice(randomIndex, 1);
        return unswerString;
      };

      const list = Array.from({ length: COUNT });
      return [
        ...acc,
        {
          id: curr.id,
          verb: curr.inf,
          answerType: currentAnswerType,
          answers: shuffle([
            { id: curr.id, value: curr[currentAnswerType] },
            ...list.map((_) => ({
              id: Math.random().toString(16),
              value: getValue(),
            })),
          ]),
        },
      ];
    }, [] as any);
  }

  async getTest(user: User) {
    const verbs = await new SimulatorsStatisticService().findAllVerbs(user);
    const accumCoeff = verbs.reduce((acc, cur) => {
      return acc + cur.coeff;
    }, 0);
    let iteration = 0;
    const completedVerbs = verbs.map((el, i, arr) => {
      iteration = iteration + el.coeff / accumCoeff;
      return {
        ...el,
        coeff: iteration,
      };
    });
    const tenRandoms = Array.from({ length: 10 }, () => Math.random());

    const RandomVerbs = tenRandoms.map((el) => {
      for (let i = 0; completedVerbs.length - 1; i++) {
        if (completedVerbs[i].coeff > el) {
          return {
            ...completedVerbs[i],
          };
        }
      }
      return {
        ...completedVerbs[completedVerbs.length - 1],
      };
    });
    return this.generateAnswers(RandomVerbs);
  }

  async getResult(user: User, result: IResult[]) {
    const simStatSer = new SimulatorsStatisticService();
    for (let index = 0; index < result.length; index++) {
      const element = result[index];
      await simStatSer.changeStatistic(user, element);
    }
    return "DONE";
  }
}
