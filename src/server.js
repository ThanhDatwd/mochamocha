/* eslint-disable no-console */
/* eslint-disable semi */
/* eslint-disable quotes */
import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import { openapiSpecification } from "~/config/swagger";
import { corsOptions } from "~/config/cors";
import { CONNECT_DB } from "./config/mongodb";
import { env } from "./config/environment";
import { APIs_V1 } from "~/routes/v1";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware";

const START_SERVER = () => {
  const app = express();
  // Handle cors policy
  app.use(cors(corsOptions));
  // Enable req.body
  app.use(express.json());
  // Use Apis
  app.use(
    "/v1/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(openapiSpecification)
  );
  app.use("/v1", APIs_V1);
  //
  app.use(errorHandlingMiddleware);
  // api doc
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(
      `Hello  I am running at http://${env.APP_HOST}:${env.APP_PORT}/`
    );
  });
};
(async () => {
  try {
    console.log("Connected to mongo cloud atlas!");
    await CONNECT_DB();
    // Start server after conected  to database successfully
    START_SERVER();
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
