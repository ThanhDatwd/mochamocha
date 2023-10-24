/* eslint-disable semi */
/* eslint-disable quotes */
import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardController } from "~/controllers/boardController";
import { boardValidation } from "~/validators/boardValidation";
const Router = express.Router();

Router.route("/")
  .get((req, res) => {
    var lengthOfLongestSubstring = function (s) {
      let str = [];
      let arrayS = s.split("");
      for (let i = 0; i < arrayS.length; i++) {
        const indexExitting = str.indexOf(arrayS[i]);
        if (indexExitting !== -1) {
          str.splice(0, indexExitting + 1);
        }
        str.push(arrayS[i]);
      }
      console.log(Math.max(0, str.length));
      console.log(str);
      return Math.max(0, str.length);
    };
    lengthOfLongestSubstring("abcabcbb");
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
Router.route("/:id")
  .get(boardController.getDetails)
  .put(boardValidation.createNew, boardController.createNew);
export const boardRouter = Router;
