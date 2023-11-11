/* eslint-disable quotes */

import { StatusCodes } from "http-status-codes";
import { vocabularyService } from "~/services/vocabularyService";
const createNew = async (req, res, next) => {
  try {
    const result = await vocabularyService.createNew(req.body);
    res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    const questions = [
      {
        type: 1,
        question: {
          frist: "",
          last: "",
        },
        options: [""],
        answer: "",
      },
      // nhap tu ban phim
      {
        type: 2,
        question: [""],
        answer: "",
      },
      // cau hoi tieng anh cau  tra loi tieng viet
      {
        type: 3,
        questions: "i am a teacher",
        options: ["giao vien", "hoc sinh", "hieu truong"],
        answer: "giao vien",
      },
      {
        type: 4,
        questions: "audio",
        answer: "",
      },
      // dungf cho practice match nhieeur dap an
      {
        type: 5,
        questions: {
          audios: [{ key: 1, value: "" }],
          texts: [{ key: 1, value: "" }],
        },
      },
    ];
    const result = await vocabularyService.getAll();
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};
const getDetails = async (req, res, next) => {
  try {
    const levelId = req.params.id;
    const result = await vocabularyService.getDetails(levelId);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const vocabularyController = {
  createNew,
  getAll,
  getDetails,
};
