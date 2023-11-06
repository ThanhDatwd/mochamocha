/* eslint-disable quotes */
import Joi from "joi";
import { ObjectId } from "mongodb";
import { GET_DB } from "~/config/mongodb";
import { columnModel } from "~/models/columnModel";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
import { cardModel } from "~/models/cardModel";

const VOCABULARY_COLLECTION_NAME = "vocabularies";
const VOCABULARY_COLLECTION_SCHEMA = Joi.object({
  vocab: Joi.string().required().min(3).max(50).trim().strict(),
  vocab_translate: Joi.string().required().min(3).max(50).trim().strict(),
  eg: Joi.string().required().trim().strict(),
  eg_translate: Joi.string().required().trim().strict(),
  eg_image: Joi.string().required().trim().strict(),
  //   type: Joi.string()
  //     .valid(
  //       "noun",
  //       "pronoun",
  //       "adjective",
  //       "verb",
  //       "vdverb",
  //       "determiner",
  //       "conjunction"
  //     )
  //     .required(),
  type_info: Joi.object({
    title: Joi.string().required().trim().strict(),
    title_translate: Joi.string().required().trim().strict(),
    symbol: Joi.string().required().trim().strict(),
  }),
  audio: Joi.string().required().trim().strict(),
  slug: Joi.string().required().min(3).trim().strict(),
  questions: Joi.array().items(
    Joi.object().keys({
      type: Joi.number().valid(1, 2, 3, 4, 5).required(),
      question: Joi.alternatives().try(
        Joi.when("type", {
          is: 1,
          then: Joi.object().keys({
            first: Joi.string().required(),
            last: Joi.string().required(),
          }),
          otherwise: Joi.string().allow(""),
        }),
        Joi.when("type", {
          is: 3,
          then: Joi.array().items().default([]),
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
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  topic_id: Joi.string()
    .pattern(OBJECT_ID_RULE)
    .message(OBJECT_ID_RULE_MESSAGE),
  createeAt: Joi.date().timestamp("javascript").default(Date.now),
  updatedAt: Joi.date().timestamp("javascript").default(null),
  _destroy: Joi.boolean().default(false),
});
const validateBeforeCreate = async (data) => {
  return await VOCABULARY_COLLECTION_SCHEMA.validateAsync(data, {
    abortEarly: false,
  });
};
const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data);
    return await GET_DB()
      .collection(VOCABULARY_COLLECTION_NAME)
      .insertOne({
        ...validData,
        level_id: new ObjectId(validData.level_id),
        topic_id: new ObjectId(validData.topic_id),
      });
  } catch (error) {
    throw new Error(error);
  }
};
const getAll = async () => {
  try {
    const result = await GET_DB()
      .collection(VOCABULARY_COLLECTION_NAME)
      .find({ _destroy: false })
      .toArray();
    return result || [];
  } catch (error) {
    throw new Error(error);
  }
};
//GET DATA CỦA MÌNH VOCAB
const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(VOCABULARY_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });
  } catch (error) {
    throw new Error(error);
  }
};
//GET DATA CỦA MÌNH VOCAB
const findByVocab = async (vocab) => {
  try {
    return await GET_DB()
      .collection(VOCABULARY_COLLECTION_NAME)
      .find({
        vocab: `/${vocab}/`,
        _destroy: false,
      });
  } catch (error) {
    throw new Error(error);
  }
};
// GET DATA BY
const getDetails = async (id) => {
  try {
    const result = await GET_DB()
      .collection(VOCABULARY_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(id),
      });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const vocabularyModel = {
  VOCABULARY_COLLECTION_NAME,
  VOCABULARY_COLLECTION_SCHEMA,
  createNew,
  getAll,
  findOneById,
  getDetails,
  findByVocab,
};
