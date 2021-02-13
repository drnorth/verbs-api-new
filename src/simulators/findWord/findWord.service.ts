import { SimulatorsStatisticService } from "simulators/simulatorsStatistic.service";

export class FindWord {
  async getTest(userId: string) {
    const verbs = await new SimulatorsStatisticService().findAllVerbs(userId);
    const accumCoeff = verbs.reduce((acc, cur) => {
      return acc + cur.coeff;
    }, 0);
  }
}
