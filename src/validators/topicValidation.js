/* eslint-disable quotes */

import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    title_translate: Joi.string().required().min(3).max(50).trim().strict(),
    thumb: Joi.string().required().trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    level_id: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
  });
  try {
    // abortEarly: dừng validate ngay khi gặp lỗi đầu tiên
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};
const updateOrder = async (req, res, next) => {
  const correctCondition = Joi.object({
    oldOrder: Joi.number().required(),
    newOrder: Joi.number().required(),
  });
  try {
    // abortEarly: dừng validate ngay khi gặp lỗi đầu tiên
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};
export const topicValidation = {
  createNew,
  updateOrder
};
