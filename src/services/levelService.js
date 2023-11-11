/* eslint-disable semi */
/* eslint-disable no-useless-catch */
/* eslint-disable quotes */

import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { levelModel } from "~/models/levelModel";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatter";

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newData = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };
    const resultCreateNew = await levelModel.createNew(newData);
    const getDataAfterCreateNew = await levelModel.findOneById(
      resultCreateNew.insertedId
    );
    return getDataAfterCreateNew;
  } catch (error) {
    throw error;
  }
};
const getAll = async () => {
  try {
    const result = await levelModel.getAll();
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Not found");
    }
    return result;
  } catch (error) {
    throw error;
  }
};
const getDetails = async (id) => {
  try {
    const result = await levelModel.getDetails(id);
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Not found");
    }
    const resResult = cloneDeep(result);
    resResult.topics.forEach((topic) => {
      topic.vocabularies = resResult.vocabularies.filter(
        (vocab) => vocab.topic_id.toString() === topic._id.toString()
      );
    });
    delete resResult.vocabularies;
    return resResult;
  } catch (error) {
    throw error;
  }
};
const updateOneById = async (id, reqBody) => {
  try {
    const result = await levelModel.updateOneById(id, reqBody);
    return result;
  } catch (error) {
    throw error;
  }
};
export const levelService = {
  createNew,
  getAll,
  getDetails,
  updateOneById,
};
