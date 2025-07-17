import Joi from 'joi';
import { sharedSchemas } from './sharedSchemas';
import { ErrorMessages } from '../utils/errorMessage';


export const signupSchema = Joi.object({
  email: sharedSchemas.email,
  password: sharedSchemas.password,
  name: sharedSchemas.name,
});

export const loginSchema = Joi.object({
  email: sharedSchemas.email,
  password: sharedSchemas.password,
});

export const resumeSchema = Joi.object({
  resume: Joi.any().required().messages({
    'any.required': ErrorMessages.NO_FILE_UPLOADED
  })
}).unknown(true); 

export const applyJobSchema = Joi.object({
  jobId: sharedSchemas.objectId,
  resumeId: sharedSchemas.objectId,
});