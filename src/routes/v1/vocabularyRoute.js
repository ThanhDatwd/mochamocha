/* eslint-disable semi */
/* eslint-disable quotes */
import express from "express";
import { vocabularyController } from "~/controllers/vocabularyController";
import { vocabularyValidation } from "~/validators/vocabularyValidation";
const Router = express.Router();

Router.route("/")
  .get(vocabularyController.getAll)
  .post(vocabularyValidation.createNew, vocabularyController.createNew);
Router.route("/:id")
  .get(vocabularyController.getDetails)
  .put(vocabularyValidation.createNew, vocabularyController.createNew);
export const vocabularyRouter = Router;
