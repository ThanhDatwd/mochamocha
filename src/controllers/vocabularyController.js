/* eslint-disable quotes */

import { StatusCodes } from "http-status-codes";
import { vocabularyService } from "~/services/vocabularyService";
const createNew = async (req, res, next) => {
  try {
    const result = await vocabularyService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const result = await vocabularyService.getAll();
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};
const getDetails = async (req, res, next) => {
  try {
    const levelId = req.params.id;
    const result = await vocabularyService.getDetails(levelId);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const vocabularyController = {
  createNew,
  getAll,
  getDetails,
};
