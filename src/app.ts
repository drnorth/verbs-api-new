import express from "express";
import bodyParser from "body-parser";
import { errorConverter, errorHandler } from "middlewares/error";
import ApiError from "utils/ApiError";
import httpStatus from "http-status";
import compression from "compression";
import router from "routes/v1";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(compression());

app.use("/api/v1", router);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

export default app;
