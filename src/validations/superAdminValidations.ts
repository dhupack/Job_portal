import Joi from 'joi';
import { sharedSchemas } from './sharedSchemas';

export const deleteUserSchema = Joi.object({
  userId: sharedSchemas.objectId,
});