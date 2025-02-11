import Joi from "joi";
import { returnResponse } from "../../lib/utils.js";

export const createQuestionValidation = (req, res, next) => {
  try {
    const createQuestionSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
      answerType : Joi.string().required(),
      options  :Joi.array(),
      answer : Joi.array().required()
    });

    const { error } = createQuestionSchema.validate(req.body);
    if (error) {
      return returnResponse(res, 400, false, {}, error.details[0].message);
    }
    next();
  } catch (err) {
    return returnResponse(res, 500, false, {}, "Error in validation");
  }
};
