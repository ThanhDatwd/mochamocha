/* eslint-disable quotes */
/* eslint-disable semi */
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
      version: "1.0.0",
    },
  },
  servers: [{ url: "http://localhost:8088" }],
  apis: ["./src/doc/apis/v1/*.js"],
};

export const openapiSpecification = swaggerJsdoc(options);
