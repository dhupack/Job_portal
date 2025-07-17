import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HTTP_CODES } from '../utils/httpCodes';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(HTTP_CODES.BAD_REQUEST).json({ message: error.details[0].message });
      return;
    }
    next();
  };
};