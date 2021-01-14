import { Request, Response, NextFunction } from "express";
import { User } from "user/user.entity";
import { StatisticService } from "./statistic.service";

export class StatisticController {
  static async getLessonStatistic(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const lessonStatistic = await new StatisticService().getLessonStatistic(
      req.user as User
    );
    return res.send(lessonStatistic);
  }

  static async getVerbStatistic(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const verbStatistic = await new StatisticService().getVerbStatistic(
      req.user as User
    );
    return res.send(verbStatistic);
  }
}
