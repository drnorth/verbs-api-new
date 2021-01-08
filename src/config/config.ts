import { config } from "dotenv";
import { ConnectionOptions } from "typeorm";

config();

const baseConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_LOGIN,
  password: process.env.DB_PASS,
  database: process.env.DB_BASE,
  synchronize: true,
  logging: false,
  entities: ["src/**/*.entity.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/**/",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};

export default {
  appConfig: {
    env: process.env.NODE_ENV || "dev",
    port: process.env.APP_PORT || 8000,
    loginSalt: process.env.LOGIN_SALT || "abc123",
  },
  jwtConfig: {
    secret: process.env.SECRET || "",
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  baseConfig,
};
