/* eslint-disable quotes */

import { StatusCodes } from "http-status-codes";
import { topicService } from "~/services/topicService";
const createNew = async (req, res, next) => {
  try {
    const result = await topicService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const result = await topicService.getAll();
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};
const getDetails = async (req, res, next) => {
  try {
    const levelId = req.params.id;
    const result = await topicService.getDetails(levelId);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const topicController = {
  createNew,
  getAll,
  getDetails,
};
