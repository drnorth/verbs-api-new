import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import httpStatus from "http-status";
import ApiError from "utils/ApiError";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errMessage = errors
      .array()
      .map((error) => error.msg)
      .join("\n");

    return next(new ApiError(httpStatus.BAD_REQUEST, errMessage));
  }

  return next();
};

export default validate;
