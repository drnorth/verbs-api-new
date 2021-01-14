import { StatisticController } from "./statistic.controller";
import { StatisticValidator } from "./statistic.validation";
import { IRouteStructure } from "types.common/route.types";

const Routes: IRouteStructure<
  typeof StatisticController,
  typeof StatisticValidator,
  StatisticValidator
> = {
  mainRoute: "/statistic",
  controller: StatisticController,
  validator: StatisticValidator,
  subRoutes: [
    {
      method: "get",
      route: "/",
      action: "getLessonStatistic",
      validate: "emptyValidation",
      auth: true,
      role: "statistic",
    },
    {
      method: "get",
      route: "/verb",
      action: "getVerbStatistic",
      validate: "emptyValidation",
      auth: true,
      role: "statistic",
    },
  ],
};

export default Routes;
