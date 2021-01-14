import { getRepository } from "typeorm";
import { ILessonStatistic, IVerbStatistic } from "types.common/statistic.types";
import { User } from "user/user.entity";
import { LessonStatistic } from "./entities/lessonStatistic.entity";
import { VerbStatistic } from "./entities/verbStatistic.entity";

export class StatisticService {
  private lessonStatisticRepository = getRepository(LessonStatistic);
  private verbStatisticRepository = getRepository(VerbStatistic);

  async save(
    lessonStatistic: ILessonStatistic,
    verbStatistic: IVerbStatistic[]
  ) {
    await this.lessonStatisticRepository.save(lessonStatistic);
    await this.verbStatisticRepository.save(verbStatistic);
  }

  async getVerbStatistic(user: User) {
    return this.verbStatisticRepository.find({ user });
  }

  async getLessonStatistic(user: User) {
    return this.lessonStatisticRepository.find({ user });
  }
}
