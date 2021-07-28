const path = require("path"); // eslint-disable-line
const envConfig = require("dotenv").config({
  path: path.resolve(
    __dirname,
    `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ""}`
  ),
});

function env(key) {
  return envConfig.parsed[key] || process.env[key];
}

const baseConfig = {
  type: "postgres",
  database: process.env.DB_BASE,
  entities: [path.resolve(__dirname, "src/**/*.entity{.ts,.js}")],
  migrations: [path.resolve(__dirname, "src/database/migrations/**/*.ts")],
  logger: "advanced-console",
  logging: ["warn", "error"],
  cli: {
    migrationsDir: path.resolve("src/database/migrations"),
  },
};

if (process.env.NODE_ENV !== "test") {
  module.exports = {
    host: "localhost",
    port: 5432,
    username: process.env.DB_LOGIN,
    password: process.env.DB_PASS,
    synchronize: false,
    ...baseConfig,
  };
} else {
  module.exports = {
    dropSchema: true,
    synchronize: true,
    ...baseConfig,
  };
}
