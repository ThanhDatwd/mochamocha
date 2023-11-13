/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
import { vocabularyModel } from "./vocabularyModel";

const TOPIC_COLLECTION_NAME = "topics";
const TOPIC_COLLECTION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  title_translate: Joi.string().required().min(3).max(50).trim().strict(),
  thumb: Joi.string().required().trim().strict(),
  description: Joi.string().required().min(3).max(256).trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  order: Joi.number().default(0),
  level_id: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  vocabulary_ids: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),
  createdAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});
const validateBeforeCreate = async (data) => {
  return await TOPIC_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};
const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    let resultFileMMaxOrder = await GET_DB()
      .collection(TOPIC_COLLECTION_NAME)
      .find()
      .sort({ order: -1 })
      .limit(1)
      .toArray();
    let order =
      resultFileMMaxOrder.length > 0 ? resultFileMMaxOrder[0].order : 1;
    return await GET_DB()
      .collection(TOPIC_COLLECTION_NAME)
      .insertOne({
        ...validData,
        level_id: new ObjectId(validData.level_id),
        order,
      });
  } catch (error) {
    throw new Error(error);
  }
};
//GET ALL
const getAll = async () => {
  try {
    const result = await GET_DB()
      .collection(TOPIC_COLLECTION_NAME)
      .find({ _destroy: false })
      .sort({ order: 1 })
      .toArray();
    return result || [];
  } catch (error) {
    throw new Error(error);
  }
};
//GET DATA CỦA MÌNH TOPIC
const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(TOPIC_COLLECTION_NAME)
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
      .collection(TOPIC_COLLECTION_NAME)
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            _destroy: false,
          },
        },
        {
          $lookup: {
            from: vocabularyModel.VOCABULARY_COLLECTION_NAME,
            localField: "_id",
            foreignField: "topic_id",
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
// UPDATE AREA
const updateOneById = async (id, data) => {
  try {
    return await GET_DB()
      .collection(TOPIC_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: data,
        },
        { returnDocument: "after" }
      );
  } catch (error) {
    throw new Error(error);
  }
};
const updateManyById = async (id, data) => {
  try {
    return await GET_DB()
      .collection(TOPIC_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: data,
        },
        { returnDocument: "after" }
      );
  } catch (error) {
    throw new Error(error);
  }
};
const updateOrder = async (id, oldOrder, newOrder) => {
  try {
    await GET_DB()
      .collection(TOPIC_COLLECTION_NAME)
      .updateMany(
        {
          order: { $gte: newOrder, $lt: oldOrder },
        },
        { $inc: { order: 1 } }
      );
    return await GET_DB()
      .collection(TOPIC_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            order: newOrder,
          },
        },
        { returnDocument: "after" }
      );
  } catch (error) {
    throw new Error(error);
  }
};
const pushVocabularyIds = async (vocabulary) => {
  try {
    const result = await GET_DB()
      .collection(TOPIC_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(vocabulary.topic_id),
        },
        {
          $push: {
            vocabulary_ids: new ObjectId(vocabulary._id),
          },
        },
        { returnDocument: "after" }
      );
    return result.value || null;
  } catch (error) {
    throw new Error(error);
  }
};
export const topicModel = {
  TOPIC_COLLECTION_NAME,
  TOPIC_COLLECTION_SCHEMA,
  createNew,
  getAll,
  findOneById,
  getDetails,
  updateOneById,
  updateManyById,
  updateOrder,
  pushVocabularyIds,
};
