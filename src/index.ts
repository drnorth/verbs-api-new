import "reflect-metadata";
import app from "./app";
import { createConnection } from "typeorm";
import config from "config/config";

const PORT = config.appConfig.port;

createConnection(config.baseConfig)
  .then(async (connection) => {
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
