import Joi from "joi";
import errors from "../../helpers/errors.mjs";

class UserValidator {
  static singnUp(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().required().min(3).max(30),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      return errors.serverError(res, result.error.details[0].message);
    }
    return next();
  }
  static login(req, res, next) {
    const schema = Joi.object({
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ac", "ug", "uk", "us", "co"] },
        })
        .required(),
      password: Joi.string()
        .required()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .min(8)
        .max(12),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(401).json({
        status: "fail",
        message: result.error.details[0].message,
      });
    }
    return next();
  }
}
export default UserValidator;
