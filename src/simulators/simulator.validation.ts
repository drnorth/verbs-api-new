import BaseValidator from "utils/baseValidator";
import { param } from "express-validator";
import { SimulatorType } from "types.common/simulators.types";
import ApiError from "utils/ApiError";

export class SimulatorValidator extends BaseValidator {
  get() {
    return [
      param("type")
        .optional()
        .custom((value, { req }) => {
          if (!Object.values(SimulatorType).includes(value)) {
            throw new ApiError(
              400,
              'type must be: "WORD" | "TEST" | "WRITE" | "LATTER"'
            );
          }
          return true;
        }),
    ];
  }
}
