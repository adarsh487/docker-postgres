import PostSchema from "./model.js";
import { returnResponse } from "../../lib/utils.js";
import { create } from "../../lib/commonQueries.js";
export default {
  createPost: async (req, res) => {
    try {
      const reqData = req.body;
      console.log('reqData',reqData);
      
      const result = await create(PostSchema, reqData);
      if (!result.status) {
        return returnResponse(
          res,
          400,
          false,
          {},
          result.error.message || "Something went wrong"
        );
      }
      return returnResponse(res, 200, true, result.data, "Post created");
    } catch (error) {
      returnResponse(res, 500, false, {}, error.message || "Server error");
    }
  },
};
