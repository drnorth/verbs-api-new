import { TRights } from "./roles.types";

interface ISubRoute<ControllerType, Validator> {
  method: string;
  route: string;
  action: Exclude<keyof ControllerType, "prototype">;
  validate: keyof Validator;
  auth?: boolean;
  role?: TRights;
}

export interface IRouteStructure<ControllerType, ValidatorType, Validator> {
  mainRoute: string;
  controller: ControllerType;
  validator: ValidatorType;
  subRoutes: ISubRoute<ControllerType, Validator>[];
}
