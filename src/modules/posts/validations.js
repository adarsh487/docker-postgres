import Joi from "joi";
import { returnResponse } from "../../lib/utils.js";

export const likeUnlikeValidation = (req, res, next) => {
  try {
    const likeUnlikeSchema = Joi.object({
      postId: Joi.string().required(),
      userId: Joi.string().required(),
      isLike: Joi.boolean().required(),
    });

    const { error } = likeUnlikeSchema.validate(req.body);
    if (error) {
      return returnResponse(res, 400, false, {}, error.details[0].message);
    }
    next();
  } catch (err) {
    return returnResponse(res, 500, false, {}, "Error in validation");
  }
};
