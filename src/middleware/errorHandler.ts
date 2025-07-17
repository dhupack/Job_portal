import { Request, Response, NextFunction } from 'express';
import { HTTP_CODES } from '../utils/httpCodes';
import { ErrorMessages } from '../utils/errorMessage';
import { logger } from '../utils/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  logger.error(`Error: ${err.message}, Stack: ${err.stack}`);

  if (err.name === 'ValidationError') {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: err.message });
    return;
  }

  if (err.name === 'MongoError' && err.code === 11000) {
    res.status(HTTP_CODES.BAD_REQUEST).json({ message: ErrorMessages.USER_ALREADY_EXISTS });
    return;
  }

  res.status(err.status || HTTP_CODES.INTERNAL_SERVER_ERROR).json({
    message: err.message || ErrorMessages.SERVER_ERROR,
  });
};