import express from "express";
import bodyParser from "body-parser";
import httpStatus from "http-status";
import compression from "compression";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";
import { jwtStrategy } from "config/passport";
import { errorConverter, errorHandler } from "middlewares/error";
import ApiError from "utils/ApiError";

import router from "routes/v1";

const app = express();

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(compression());

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/api/v1", router);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

export default app;
