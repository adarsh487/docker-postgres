import { returnResponse } from "../../lib/utils.js";
import UserSchema from "./model.js";
import { create, getAll, getById } from "../../lib/commonQueries.js";
import { getGeminiRes } from "../../lib/helpers.js";

export default {
  registerUser: async (req, res) => {
    try {
      const reqData = req.body;
      let result = await create(UserSchema, reqData);

      if (!result.status) {
        if (result.error.name === "SequelizeUniqueConstraintError") {
          let message = result.error.errors[0].message;
          return returnResponse(res, 400, false, {}, message);
        }
      }

      return returnResponse(res, 200, true, result.data, "User registered");
    } catch (err) {
      let message = err.message || "Server error";
      return returnResponse(res, 500, false, {}, message);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const limit = req.query.limit || 4;
      const page = req.query.page || 1;
      const offset = (page - 1) * limit;
      let users = await getAll(UserSchema, limit, offset);
      return returnResponse(res, 200, true, users, "Users fetched");
    } catch (err) {
      return returnResponse(res, 500, false, {}, err.message || "Server error");
    }
  },

  getUserById: async (req, res) => {
    try {
      const { userId } = req.query;
      let user = await getById(UserSchema, userId);
      return returnResponse(res, 200, true, user, "Users details fetched");
    } catch (err) {
      return returnResponse(res, 500, false, {}, err.message || "Server error");
    }
  },

  chat: async (req, res) => {
    try {
      const { prompt } = req.query;
      let response = await getGeminiRes(prompt);
      if (!response.status) {
        return returnResponse(res, 200, false, {}, response.error);
      }
      const stream = response.data;

      for await (const chunk of stream) {
        res.write(`${JSON.stringify(chunk)}\n\n`); // Send each response chunk
      }
      res.end();
      // return returnResponse(res, 200, true, response.data, "Response fetched");
    } catch (err) {
      return returnResponse(res, 500, false, {}, err.message || "Server error");
    }
  },
};
