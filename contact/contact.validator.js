import Joi from "@hapi/joi";

const createContactValidSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  subscription: Joi.string().required(),
  password: Joi.string().required(),
});

const updateContactValidSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  subscription: Joi.string(),
  password: Joi.string(),
  token: Joi.string(),
});

export const createContacValidateMiddleware = (req, res, next) => {
  const result = createContactValidSchema.validate(req.body);
  console.log("result", result);
  if (result.error) {
    return res.status(403).json("Bad request");
  }
  next();
};

export const updateContacValidateMiddleware = (req, res, next) => {
  const result = updateContactValidSchema.validate(req.body);
  if (result.error) {
    return res.status(403).json("Bad request");
  }
  next();
};
