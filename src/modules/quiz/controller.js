import QuizSchema from "./model.js";
import { returnResponse } from "../../lib/utils.js";
import { create, getAll } from "../../lib/commonQueries.js";

export default {
  createQuestion: async (req, res) => {
    try {
      const reqData = req.body;
      console.log("reqData", reqData);

      const result = await create(QuizSchema, reqData);
      if (!result.status) {
        return returnResponse(
          res,
          400,
          false,
          {},
          result.error.message || "Something went wrong"
        );
      }
      return returnResponse(res, 200, true, result.data, "Question created");
    } catch (error) {
      returnResponse(res, 500, false, {}, error.message || "Server error");
    }
  },
  getAll: async (req, res) => {
    try {
      const result = await getAll(QuizSchema, 10, 0, [
        "id",
        "title",
        "description",
        "isActive",
        "answerType",
        "options",
        "createdAt",
        "updatedAt",
      ]);
      return returnResponse(res, 200, true, result, "Question fetched");
    } catch (error) {
      returnResponse(res, 500, false, {}, error.message || "Server error");
    }
  },
};
