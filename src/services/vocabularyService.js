/* eslint-disable semi */
/* eslint-disable no-useless-catch */
/* eslint-disable quotes */

import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { topicModel } from "~/models/topicModel";
import { vocabularyModel } from "~/models/vocabularyModel";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatter";

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newData = {
      ...reqBody,
      slug: slugify(reqBody.vocab),
    };
    const resultCreateNew = await vocabularyModel.createNew(newData);
    const dataAfterCreateNew = await vocabularyModel.findOneById(
      resultCreateNew.insertedId
    );
    if (dataAfterCreateNew) {
      topicModel.pushVocabularyIds(dataAfterCreateNew);
    }
    return dataAfterCreateNew;
  } catch (error) {
    throw error;
  }
};
const getAll = async () => {
  try {
    const result = await vocabularyModel.getAll();
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
    const result = await vocabularyModel.getDetails(id);
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Not found");
    }
    return result;
  } catch (error) {
    throw error;
  }
};
export const vocabularyService = {
  createNew,
  getAll,
  getDetails,
};
