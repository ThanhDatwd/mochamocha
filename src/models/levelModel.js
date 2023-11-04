/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
import { topicModel } from "./topicModel";
import { vocabularyModel } from "./vocabularyModel";

const LEVEL_COLLECTION_NAME = "levels";
const LEVEL_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  goal: Joi.string().required().trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  topic_ids: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createeAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});
const validateBeforeCreate = async (data) => {
  return await LEVEL_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};
const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    return await GET_DB()
      .collection(LEVEL_COLLECTION_NAME)
      .insertOne(validData);
  } catch (error) {
    throw new Error(error);
  }
};
//GET LIST
const getMany = async () => {
  try {
    const result = await GET_DB.collection(LEVEL_COLLECTION_NAME).find();
    return result || [];
  } catch (error) {
    throw new Error(error);
  }
};
//GET DATA CỦA MÌNH LEVEL
const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(LEVEL_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });
  } catch (error) {
    throw new Error(error);
  }
};

// GET DATA TONG HỢP
const getDetails = async (id) => {
  try {
    const result = await GET_DB()
      .collection(LEVEL_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            _destroy: false,
          },
        },
        {
          $lookup: {
            from: topicModel.TOPIC_COLLECTION_NAME,
            localField: "_id",
            foreignField: "level_id",
            as: "topics",
          },
        },
        {
          $lookup: {
            from: vocabularyModel.VOCABULARY_COLLECTION_NAME,
            localField: "_id",
            foreignField: "level_id",
            as: "vocabularies",
          },
        },
      ])
      .toArray();
    return result[0] || {};
  } catch (error) {
    throw new Error(error);
  }
};

export const levelModel = {
  LEVEL_COLLECTION_NAME,
  LEVEL_COLLECTION_SCHEMA,
  createNew,
  getMany,
  findOneById,
  getDetails,
};
