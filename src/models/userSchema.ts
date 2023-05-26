import Joi from 'joi';

export const userSchemaWithId = Joi.object({
  id: Joi.alternatives().try(Joi.string().required(), Joi.number().integer().required()),

  login: Joi.string().required(),

  password: Joi.string()
    .alphanum()
    .pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])/))
    .required(),

  age: Joi.number().integer().min(4).max(130).required(),

  isDeleted: Joi.boolean().required(),
});

export const userSchema = Joi.object({
  login: Joi.string().required(),

  password: Joi.string()
    .alphanum()
    .pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*[0-9])/))
    .required(),

  age: Joi.number().integer().min(4).max(130).required(),
});
