/* eslint-disable no-useless-catch */
/* eslint-disable quotes */

import { StatusCodes } from "http-status-codes";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatter";

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };
    const resultCreateNewBoard = await boardModel.createNew(newBoard);
    const getNewBoard = await boardModel.findOneById(
      resultCreateNewBoard.insertedId
    );
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};
const getDetails = async (id) => {
  try {
    const board = await boardModel.getDetails(id);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Not found board");
    }
    return board;
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
  getDetails,
};
