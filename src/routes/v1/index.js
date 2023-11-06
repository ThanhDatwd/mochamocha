/* eslint-disable semi */
/* eslint-disable quotes */
import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRouter } from "~/routes/v1/boardRoute";
import { levelRouter } from "./levelRoute";
import { topicRouter } from "./topicRoute";
import { vocabularyRouter } from "./vocabularyRoute";

const Router = express.Router();
Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "APIs V1 are ready to use",
  });
});
Router.use("/boards", boardRouter);
Router.use("/levels", levelRouter);
Router.use("/topics", topicRouter);
Router.use("/vocabularies", vocabularyRouter);
export const APIs_V1 = Router;
