import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HTTP_CODES } from '../utils/httpCodes';


export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      res.status(HTTP_CODES.BAD_REQUEST).json({ message: errorMessage });
      return;
    }
    next();
  };
};