import Joi from "joi";
import { returnResponse } from "../../lib/utils.js";

export const registerValidation = (req, res, next) => {
  try {
    const userSchema = Joi.object({
      userName: Joi.string().min(2).max(14).required(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().required(),
      password: Joi.string().min(6).required(),
      countryCode: Joi.string().required(),
    });

    const { error } = userSchema.validate(req.body);
    if (error) {
      console.log("error.details", error.details);

      return returnResponse(res, 400, false, {}, error.details[0].message);
    }
    next();
    // console.log("error log", error);
  } catch (err) {
    return returnResponse(res, 500, false, {}, "Error in validation");
  }
};
