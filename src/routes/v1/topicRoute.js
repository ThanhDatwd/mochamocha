/* eslint-disable semi */
/* eslint-disable quotes */
import express from "express";
import { topicController } from "~/controllers/topicController";
import { topicValidation } from "~/validators/topicValidation";
const Router = express.Router();

Router.route("/")
  .get(topicController.getAll)
  .post(topicValidation.createNew, topicController.createNew);
Router.route("/:id")
  .get(topicController.getDetails)
  .put(topicValidation.createNew, topicController.createNew);
export const topicRouter = Router;
