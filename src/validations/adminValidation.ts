import Joi from 'joi';
import { sharedSchemas } from './sharedSchemas';

export const createJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  company: Joi.string().required(),
  location: Joi.string().required(),
  type: Joi.string().valid('full-time', 'part-time', 'internship').required(),
});

export const scheduleInterviewSchema = Joi.object({
  applicationId: sharedSchemas.objectId,
  scheduledAt: Joi.date().required(),
});