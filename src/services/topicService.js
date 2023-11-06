/* eslint-disable semi */
/* eslint-disable no-useless-catch */
/* eslint-disable quotes */

import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { levelModel } from "~/models/levelModel";
import { topicModel } from "~/models/topicModel";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatter";

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newData = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };
    const resultCreateNew = await topicModel.createNew(newData);
    const dataAfterCreateNew = await topicModel.findOneById(
      resultCreateNew.insertedId
    );
    if (dataAfterCreateNew) {
      await levelModel.pushTopicIds(dataAfterCreateNew);
    }
    return dataAfterCreateNew;
  } catch (error) {
    throw error;
  }
};
const getAll = async () => {
  try {
    const result = await topicModel.getAll();
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
    const result = await topicModel.getDetails(id);
    if (!result) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Not found");
    }
    return result;
  } catch (error) {
    throw error;
  }
};
export const topicService = {
  createNew,
  getAll,
  getDetails,
};
