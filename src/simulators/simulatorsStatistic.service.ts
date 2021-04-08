import { getRepository } from "typeorm";
import { SimulatorsStatistic } from "./simulatorsStatistic.entity";
import { Verb } from "verbs/verb.entity";
import { User } from "user/user.entity";
import { IResult } from "types.common/simulators.types";

export class SimulatorsStatisticService {
  private verbRepository = getRepository(Verb);
  private SimulatorsStatisticRepo = getRepository(SimulatorsStatistic);

  async findAllVerbs(userId: User) {
    return await this.verbRepository
      .createQueryBuilder("verb")
      .leftJoin(
        SimulatorsStatistic,
        "simulatorsStatistic",
        "simulatorsStatistic.verbId = verb.id AND simulatorsStatistic.userId = :user",
        { user: userId }
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

  async changeStatistic(user: User, data: any) {
    const simStat = await this.SimulatorsStatisticRepo.findOne({
      user,
      verb: data.id,
    });
    if (simStat) {
      simStat.count += 1;
      simStat.correct += data.correct ? 1 : 0;
      return;
    }
    await this.SimulatorsStatisticRepo.save({
      user,
      verb: data.id,
      count: 1,
      correct: data.correct ? 1 : 0,
    });
    return;
  }
}
