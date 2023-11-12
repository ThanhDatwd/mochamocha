/* eslint-disable semi */
/* eslint-disable quotes */
import express from "express";
import { levelValidation } from "~/validators/levelValidation";
import { levelController } from "~/controllers/levelController";
const Router = express.Router();

Router.route("/")
  .get(levelController.getAll)
  .post(levelValidation.createNew, levelController.createNew);
Router.route("/:id")
  .get(levelController.getDetails)
  .put(levelValidation.createNew, levelController.updateOneById);
Router.route("/update-order/:id")
  .put(levelValidation.updateOrder, levelController.updateOrder);
export const levelRouter = Router;
