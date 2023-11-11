/* eslint-disable quotes */

import Joi from "joi";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    vocab: Joi.string().required().min(3).max(50).trim().strict(),
    vocab_translate: Joi.string().required().min(3).max(50).trim().strict(),
    eg: Joi.string().required().trim().strict(),
    eg_translate: Joi.string().required().trim().strict(),
    eg_image: Joi.string().required().trim().strict(),
    type_info: Joi.object({
      type: Joi.string().required().trim().strict(),
      type_translate: Joi.string().required().trim().strict(),
      symbol: Joi.string().required().trim().strict(),
    }),
    audio: Joi.string().required().trim().strict(),
    questions: Joi.array().items(
      Joi.object().keys({
        type: Joi.number().valid(1, 2, 3, 4, 5).required(),
        question: Joi.alternatives().try(
          Joi.when("type", {
            is: 1,
            then: Joi.object().keys({
              frist: Joi.string().allow(""),
              last: Joi.string().allow(""),
            }),
            otherwise: Joi.string().allow(""),
          }),
          Joi.when("type", {
            is: 2,
            then: Joi.array()
              .items(Joi.string().allow("").default(""))
              .default([]),
            otherwise: Joi.string().allow(""),
          }),
          Joi.when("type", {
            is: 4,
            then: Joi.string().valid("audio").required(),
            otherwise: Joi.string().allow(""),
          }),
          Joi.when("type", {
            is: 5,
            then: Joi.object()
              .keys({
                audios: Joi.array()
                  .items(
                    Joi.object().keys({
                      key: Joi.number().required(),
                      value: Joi.string().required(),
                    })
                  )
                  .required(),
                texts: Joi.array()
                  .items(
                    Joi.object().keys({
                      key: Joi.number().required(),
                      value: Joi.string().required(),
                    })
                  )
                  .required(),
              })
              .required(),
            otherwise: Joi.string().allow(""),
          })
        ),

        options: Joi.array().items(Joi.string()).optional(),
        answer: Joi.string().required(),
      })
    ),
    level_id: Joi.string()
      .required()
      .pattern(OBJECT_ID_RULE)
      .message(OBJECT_ID_RULE_MESSAGE),
    topic_id: Joi.string()
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
export const vocabularyValidation = {
  createNew,
};
