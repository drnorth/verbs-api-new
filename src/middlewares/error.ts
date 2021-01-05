import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import ApiError from "utils/ApiError";
import config from "config/config";

const errorConverter = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode: keyof httpStatus.HttpStatus = error.statusCode || 500;
    const message: string = error.message || httpStatus[statusCode];
    error = new ApiError(Number(statusCode), message, false, err.stack);
  }
  next(error);
};

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode, message } = err;
  if (config.appConfig.env === "prod" && !err.isOperational) {
    statusCode = 500;
    message = httpStatus[500];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.appConfig.env === "dev" && { stack: err.stack }),
  };

  res.status(statusCode).send(response);
};

export { errorConverter, errorHandler };
