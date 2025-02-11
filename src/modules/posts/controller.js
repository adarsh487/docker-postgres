import PostSchema from "./model.js";
import { returnResponse } from "../../lib/utils.js";
import {
    create,
    findOne,
    getAll,
    update,
    updateCount,
} from "../../lib/commonQueries.js";
import UserSchema from "../users/model.js";
import PostLikeSchema from "./likeModel.js";

export default {
    createPost: async(req, res) => {
        try {
            const reqData = req.body;
            console.log("reqData", reqData);

            const result = await create(PostSchema, reqData);
            if (!result.status) {
                return returnResponse(
                    res,
                    400,
                    false, {},
                    result.error.message || "Something went wrong"
                );
            }
            return returnResponse(res, 200, true, result.data, "Post created");
        } catch (error) {
            returnResponse(res, 500, false, {}, error.message || "Server error");
        }
    },
    getAll: async(req, res) => {
        try {
            const result = await getAll(
                PostSchema,
                10,
                0, [], {}, {
                    include: [{
                        model: UserSchema,
                        as: "postUser",
                        attributes: ["userName", "id", "email"],
                    }, ],
                }
            );
            return returnResponse(res, 200, true, result, "Post created");
        } catch (error) {
            returnResponse(res, 500, false, {}, error.message || "Server error");
        }
    },
    likeUnlikePost: async(req, res) => {
        try {
            const reqData = req.body;
            const { postId, userId, isLike } = reqData;
            const message = `Post ${isLike ? "liked" : "un liked"} successfully`;

            const likeExist = await findOne(PostLikeSchema, { where: { post_id: postId, user_id: userId } });
            console.log("likeExist=>>", likeExist);

            const operation = isLike ? 'increment' : 'decrement';

            //update existing like
            if (likeExist && likeExist.isActive !== isLike) {
                await update(PostLikeSchema, { isActive: isLike }, { id: likeExist.id });
                updateCount(PostSchema, "likes", operation, 1, { id: postId });
                return returnResponse(res, 400, false, {}, message);
            } else if (likeExist && likeExist.isActive === isLike) {
                return returnResponse(res, 400, false, {}, `Already ${isLike ? "liked" : "un liked"}`);
            }
            //create new like and update counter
            const payload = { post_id: postId, user_id: userId, isActive: isLike };
            const result = await create(PostLikeSchema, payload);
            if (!result.status) {
                return returnResponse(
                    res,
                    400,
                    false, {},
                    result.error.message || "Something went wrong"
                );
            }
            updateCount(PostSchema, "likes", operation, 1, { id: postId });
            return returnResponse(res, 200, true, result.data, message);
        } catch (error) {
            returnResponse(res, 500, false, {}, error.message || "Server error");
        }
    },
};