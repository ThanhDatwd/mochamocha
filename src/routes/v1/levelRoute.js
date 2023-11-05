/* eslint-disable semi */
/* eslint-disable quotes */
import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardController } from "~/controllers/boardController";
import { boardValidation } from "~/validators/boardValidation";
import Joi from "joi";
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    res.status(StatusCodes.OK).json({
      message: "APIs get board",
    });
  })
  .post(
    (req, res, next) => {
      console.log("xin chaof this is post");
      next();
    },
    boardValidation.createNew,
    boardController.createNew
  );
Router.route("/:slug")
  .get(boardController.getDetails)
  .put(boardValidation.createNew, boardController.createNew);
export const levelRouter = Router;
