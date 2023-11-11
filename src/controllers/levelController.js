/* eslint-disable quotes */

import { StatusCodes } from "http-status-codes";
import { levelService } from "~/services/levelService";
const createNew = async (req, res, next) => {
  try {
    const result = await levelService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const result = await levelService.getAll();
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};
const getDetails = async (req, res, next) => {
  try {
    const levelId = req.params.id;
    const result = await levelService.getDetails(levelId);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};
const updateOneById = async (req, res, next) => {
  try {
    const levelId = req.params.id;
    const result = await levelService.updateOneById(levelId, req.body);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const levelController = {
  createNew,
  getAll,
  getDetails,
  updateOneById,
};
