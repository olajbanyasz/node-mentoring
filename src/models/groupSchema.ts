import Joi from 'joi';

export const groupSchemaWithId = Joi.object({
    id: Joi.alternatives().try(Joi.string().required(), Joi.number().integer().required()),

    name: Joi.string().required(),

    permissions: Joi.array().items(Joi.string().valid('READ','WRITE','DELETE','SHARE','UPLOAD_FILES')).required()
});

export const groupSchema = Joi.object({
    name: Joi.string().required(),

    permissions: Joi.array().items(Joi.string().valid('READ','WRITE','DELETE','SHARE','UPLOAD_FILES')).required()
});
