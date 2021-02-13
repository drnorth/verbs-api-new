import { getRepository } from "typeorm";
import { SimulatorsStatistic } from "./simulatorsStatistic.entity";
import { Verb } from "verbs/verb.entity";

export class SimulatorsStatisticService {
  private verbRepository = getRepository(Verb);

  async findAllVerbs(userId: string) {
    return await this.verbRepository
      .createQueryBuilder("verb")
      .leftJoin(
        SimulatorsStatistic,
        "simulatorsStatistic",
        "simulatorsStatistic.verbId = verb.id AND simulatorsStatistic.userId = :user",
        { user: Number(userId) }
      )
      .addSelect(
        "CASE WHEN simulatorsStatistic.id IS NULL THEN 0 ELSE simulatorsStatistic.correct END",
        "correct"
      )
      .addSelect(
        "CASE WHEN simulatorsStatistic.id IS NULL THEN 0 ELSE simulatorsStatistic.count END",
        "count"
      )
      .addSelect(
        "CASE WHEN simulatorsStatistic.id IS NULL OR simulatorsStatistic.count = 0 THEN 1 WHEN simulatorsStatistic.correct = 0 THEN simulatorsStatistic.count ELSE simulatorsStatistic.count / simulatorsStatistic.correct END",
        "verb_coeff"
      )
      .getMany();
  }
}
