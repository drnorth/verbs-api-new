import { config } from "dotenv";
import { ConnectionOptions } from "typeorm";

config();

const pathForTypeORM = process.env.NODE_ENV === "dev" ? "src/" : "build/";
const typeForTypeORM = process.env.NODE_ENV === "dev" ? "ts" : "js";

const baseConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_LOGIN,
  password: process.env.DB_PASS,
  database: process.env.DB_BASE,
  synchronize: true,
  logging: false,
  entities: [pathForTypeORM + "**/*.entity." + typeForTypeORM],
  migrations: [pathForTypeORM + "migration/**/*." + typeForTypeORM],
  subscribers: [pathForTypeORM + "subscriber/**/*." + typeForTypeORM],
  cli: {
    entitiesDir: pathForTypeORM + "**/",
    migrationsDir: pathForTypeORM + "migration",
    subscribersDir: pathForTypeORM + "subscriber",
  },
};

export default {
  appConfig: {
    env: process.env.NODE_ENV || "dev",
    port: process.env.APP_PORT || 8000,
    loginSalt: process.env.LOGIN_SALT || "abc123",
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET || "",
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  baseConfig,
  swaggerConfig: {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Eazy verbs API",
        version: "1.0.0",
        description: "Learning 3 forms of irregular verbs",
        license: {
          name: "MIT",
          url: "https://choosealicense.com/licenses/mit/",
        },
        contact: {
          name: "RuBag",
          url: "https://swagger.io",
          email: "drnorth.rus@gmail.com",
        },
      },
      servers: [
        {
          url: `http://localhost:${process.env.APP_PORT || 8000}/api/v1`,
        },
      ],
    },
    apis: [pathForTypeORM + "**/*.route*." + typeForTypeORM],
  },
};
