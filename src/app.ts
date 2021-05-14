import express from "express";
import path from "path";
import bodyParser from "body-parser";
import httpStatus from "http-status";
import compression from "compression";
import passport from "passport";
import helmet from "helmet";
import cors from "cors";
import { jwtStrategy } from "config/passport";
import { errorConverter, errorHandler } from "middlewares/error";
import ApiError from "utils/ApiError";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import config from "config/config";

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

app.get("/", (req, res, next) => {
  return res.redirect("/docs");
});

app.use("/docs", swaggerUi.serve);
app.get(
  "/docs",
  swaggerUi.setup(swaggerJSDoc(config.swaggerConfig), { explorer: true })
);

app.get("/terms", (req, res, next) => {
  return res.sendFile(path.join(__dirname, "/HTML/terms.html"));
});

app.get("/privacy", (req, res, next) => {
  return res.sendFile(path.join(__dirname, "/HTML/privacy.html"));
});

app.use("/api/v1", router);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

export default app;
