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
  order: Joi.number().default(0),
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
    let resultFileMMaxOrder = await GET_DB()
      .collection(LEVEL_COLLECTION_NAME)
      .find()
      .sort({ order: -1 })
      .limit(1)
      .toArray();
    let order =
      resultFileMMaxOrder.length > 0 ? resultFileMMaxOrder[0].order + 1 : 1;
    const validData = await validateBeforeCreate(data);
    return await GET_DB()
      .collection(LEVEL_COLLECTION_NAME)
      .insertOne({ ...validData, order });
  } catch (error) {
    throw new Error(error);
  }
};
//GET LIST
const getAll = async () => {
  try {
    return await GET_DB()
      .collection(LEVEL_COLLECTION_NAME)
      .find({ _destroy: false })
      .sort({ order: 1 })
      .toArray();
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
// UPDATE AREA
const updateOneById = async (id, data) => {
  try {
    return await GET_DB()
      .collection(LEVEL_COLLECTION_NAME)
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
      .collection(LEVEL_COLLECTION_NAME)
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
      .collection(LEVEL_COLLECTION_NAME)
      .updateMany(
        {
          order: { $gte: newOrder, $lt: oldOrder },
        },
        { $inc: { order: 1 } }
      );
    return await GET_DB()
      .collection(LEVEL_COLLECTION_NAME)
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
const destroySoftOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(LEVEL_COLLECTION_NAME)
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: { _destroy: true },
        }
      );
  } catch (error) {
    throw new Error(error);
  }
};
const pushTopicIds = async (topic) => {
  try {
    const result = await GET_DB()
      .collection(LEVEL_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(topic.level_id),
        },
        {
          $push: {
            topic_ids: new ObjectId(topic._id),
          },
        },
        { returnDocument: "after" }
      );
    return result.value || null;
  } catch (error) {
    throw new Error(error);
  }
};
export const levelModel = {
  LEVEL_COLLECTION_NAME,
  LEVEL_COLLECTION_SCHEMA,
  createNew,
  getAll,
  findOneById,
  getDetails,
  pushTopicIds,
  updateOneById,
  updateManyById,
  destroySoftOneById,
  updateOrder,
};
