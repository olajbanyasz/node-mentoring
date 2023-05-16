import Joi from 'joi';

export const userSchema = Joi.object({
  id: Joi.string().required(),

  login: Joi.string().required(),

  password: Joi.string()
    .alphanum()
    .pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])/))
    .required(),

  age: Joi.number().integer().min(4).max(130).required(),

  isDeleted: Joi.boolean().required(),
});
