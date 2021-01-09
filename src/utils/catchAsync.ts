import { RequestHandler } from "express";
const catchAsync = (fn: RequestHandler) => {
  return <RequestHandler>function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

export default catchAsync;
