import Joi from 'joi';

export const sharedSchemas = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  objectId: Joi.string().hex().length(24).required(),
  name: Joi.string().required(),
};